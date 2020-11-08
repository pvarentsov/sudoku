import { Inject, UseFilters } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { GatewayEvents } from '@sudoku/app/server/gateways/events/GatewayEvents';
import { SudokuExceptionFilter } from '@sudoku/app/server/gateways/exception-handler/SudokuExceptionFilter';
import { SocketPlayerManager } from '@sudoku/app/server/gateways/socket-manager/SocketPlayerManager';
import { CoreDITokens, Optional } from '@sudoku/core/common';
import {
  InputCreateNewGameDTO,
  InputCreatePlayerDTO,
  InputEnterValueGameDTO,
  InputJoinPlayerGameDTO,
  InputLeaveGameDTO,
  InputListGamesDTO,
  InputListPlayersDTO,
  InputPlayGameDTO,
  InputRemovePlayerDTO,
  IService,
  OutputGameDTO,
  OutputPlayerDTO
} from '@sudoku/core/service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@UseFilters(SudokuExceptionFilter)
export class SudokuEventGateway implements OnGatewayDisconnect {

  @WebSocketServer()
  private readonly socketServer: Server;
  
  constructor(
    @Inject(SocketPlayerManager)
    private readonly socketPlayerManager: SocketPlayerManager,

    @Inject(CoreDITokens.CreateNewGameService)
    private readonly createNewGameService: IService<InputCreateNewGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.JoinPlayerGameService)
    private readonly joinPlayerGameService: IService<InputJoinPlayerGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.PlayGameService)
    private readonly playGameService: IService<InputPlayGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.EnterValueGameService)
    private readonly enterValueGameService: IService<InputEnterValueGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.LeaveGameService)
    private readonly leaveGameService: IService<InputLeaveGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.ListGamesService)
    private readonly listGamesService: IService<InputListGamesDTO, OutputGameDTO[]>,

    @Inject(CoreDITokens.CreatePlayerService)
    private readonly createPlayerService: IService<InputCreatePlayerDTO, OutputPlayerDTO>,

    @Inject(CoreDITokens.ListPlayersService)
    private readonly listPlayersService: IService<InputListPlayersDTO, OutputPlayerDTO[]>,

    @Inject(CoreDITokens.RemovePlayerService)
    private readonly removePlayerService: IService<InputRemovePlayerDTO, void>,
  ) {}

  public async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    const playerId: Optional<string> = this.socketPlayerManager.getPlayerId(socket);

    if (playerId) {
      this.socketPlayerManager.removePlayer(playerId);
      await this.removePlayerService.execute({id: playerId});

      const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: playerId});
      const players: OutputPlayerDTO[] = await this.listPlayersService.execute({executorId: playerId});

      socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);
      socket.broadcast.emit(GatewayEvents.Player.UpdateList, players);
    }
  }
  
  @SubscribeMessage(GatewayEvents.Game.Create)
  public async createGame(@ConnectedSocket() socket: Socket, @MessageBody() input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.createNewGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    socket.emit(GatewayEvents.Game.UpdateList, games);
    socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);

    return game;
  }

  @SubscribeMessage(GatewayEvents.Game.JoinPlayer)
  public async joinPlayer(@ConnectedSocket() socket: Socket, @MessageBody() input: InputJoinPlayerGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.joinPlayerGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    this.socketPlayerManager.sendMessageToPlayers(GatewayEvents.Game.Play, game, game.players.map(player => player.id));

    socket.emit(GatewayEvents.Game.UpdateList, games);
    socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);

    return game;
  }

  @SubscribeMessage(GatewayEvents.Game.Play)
  public async playGame(@ConnectedSocket() socket: Socket, @MessageBody() input: InputPlayGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.playGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    this.socketPlayerManager.sendMessageToPlayers(GatewayEvents.Game.Play, game, game.players.map(player => player.id));

    socket.emit(GatewayEvents.Game.UpdateList, games);
    socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);

    return game;
  }

  @SubscribeMessage(GatewayEvents.Game.Leave)
  public async leaveGame(@ConnectedSocket() socket: Socket, @MessageBody() input: InputLeaveGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.leaveGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    const playerIdsExceptExecutor: string[] = game.players
      .map(player => player.id)
      .filter(id => id !== input.executorId);

    this.socketPlayerManager.sendMessageToPlayers(GatewayEvents.Game.Play, game, playerIdsExceptExecutor);

    socket.emit(GatewayEvents.Game.UpdateList, games);
    socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);

    return game;
  }

  @SubscribeMessage(GatewayEvents.Game.EnterValue)
  public async enterValueGame(@ConnectedSocket() socket: Socket, @MessageBody() input: InputEnterValueGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.enterValueGameService.execute(input);
    this.socketPlayerManager.sendMessageToPlayers(GatewayEvents.Game.Play, game, game.players.map(player => player.id));

    if (game.winner) {
      const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});
      const players: OutputPlayerDTO[] = await this.listPlayersService.execute({executorId: input.executorId});

      socket.emit(GatewayEvents.Game.UpdateList, games);
      socket.broadcast.emit(GatewayEvents.Game.UpdateList, games);

      socket.emit(GatewayEvents.Player.UpdateList, players);
      socket.broadcast.emit(GatewayEvents.Player.UpdateList, players);
    }

    return game;
  }

  @SubscribeMessage(GatewayEvents.Game.List)
  public async listGames(client: Socket, @MessageBody() input: InputListGamesDTO): Promise<OutputGameDTO[]> {
    return this.listGamesService.execute(input);
  }

  @SubscribeMessage(GatewayEvents.Player.Create)
  public async createPlayer(@ConnectedSocket() socket: Socket, @MessageBody() input: InputCreatePlayerDTO): Promise<OutputPlayerDTO> {
    const player: OutputPlayerDTO = await this.createPlayerService.execute(input);
    const players: OutputPlayerDTO[] = await this.listPlayersService.execute({executorId: player.id});

    this.socketPlayerManager.addPlayerSocket(player.id, socket);

    socket.emit(GatewayEvents.Player.UpdateList, players);
    socket.broadcast.emit(GatewayEvents.Player.UpdateList, players);

    return player;
  }

  @SubscribeMessage(GatewayEvents.Player.List)
  public async listPlayers(@ConnectedSocket() socket: Socket, @MessageBody() input: InputListPlayersDTO): Promise<OutputPlayerDTO[]> {
    return this.listPlayersService.execute(input);
  }

}