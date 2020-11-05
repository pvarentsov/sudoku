import { Inject, UseFilters } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SudokuExceptionFilter } from '@sudoku/app/gateways/exception-handler/SudokuExceptionFilter';
import { SocketPlayerManager } from '@sudoku/app/gateways/socket-manager/SocketPlayerManager';
import { CoreDITokens } from '@sudoku/core/common';
import {
  InputCreateNewGameDTO,
  InputCreatePlayerDTO, InputJoinPlayerGameDTO,
  InputListGamesDTO,
  InputListPlayersDTO,
  IService,
  OutputGameDTO,
  OutputPlayerDTO
} from '@sudoku/core/service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@UseFilters(SudokuExceptionFilter)
export class SudokuEventGateway {

  @WebSocketServer()
  private readonly socketServer: Server;
  
  constructor(
    @Inject(SocketPlayerManager)
    private readonly socketPlayerManager: SocketPlayerManager,

    @Inject(CoreDITokens.CreateNewGameService)
    private readonly createNewGameService: IService<InputCreateNewGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.JoinPlayerGameService)
    private readonly joinPlayerGameService: IService<InputJoinPlayerGameDTO, OutputGameDTO>,

    @Inject(CoreDITokens.ListGamesService)
    private readonly listGamesService: IService<InputListGamesDTO, OutputGameDTO[]>,

    @Inject(CoreDITokens.CreatePlayerService)
    private readonly createPlayerService: IService<InputCreatePlayerDTO, OutputPlayerDTO>,

    @Inject(CoreDITokens.ListPlayersService)
    private readonly listPlayersService: IService<InputListPlayersDTO, OutputPlayerDTO[]>,
  ) {}
  
  @SubscribeMessage('game:create')
  public async createGame(@ConnectedSocket() socket: Socket, @MessageBody() input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.createNewGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    socket.emit('game:update-list', games);
    socket.broadcast.emit('game:update-list', games);

    return game;
  }

  @SubscribeMessage('game:join-player')
  public async joinPlayer(@ConnectedSocket() socket: Socket, @MessageBody() input: InputJoinPlayerGameDTO): Promise<OutputGameDTO> {
    const game: OutputGameDTO = await this.joinPlayerGameService.execute(input);
    const games: OutputGameDTO[] = await this.listGamesService.execute({executorId: input.executorId});

    socket.emit('game:update-list', games);
    socket.broadcast.emit('game:update-list', games);

    return game;
  }

  @SubscribeMessage('game:list')
  public async listGames(client: Socket, @MessageBody() input: InputListGamesDTO): Promise<OutputGameDTO[]> {
    return this.listGamesService.execute(input);
  }

  @SubscribeMessage('player:create')
  public async createPlayer(@ConnectedSocket() socket: Socket, @MessageBody() input: InputCreatePlayerDTO): Promise<OutputPlayerDTO> {
    const player: OutputPlayerDTO = await this.createPlayerService.execute(input);
    const players: OutputPlayerDTO[] = await this.listPlayersService.execute({executorId: player.id});

    this.socketPlayerManager.addPlayerSocket(player.id, socket);

    socket.emit('player:update-list', players);
    socket.broadcast.emit('player:update-list', players);

    return player;
  }

  @SubscribeMessage('player:list')
  public async listPlayers(@ConnectedSocket() socket: Socket, @MessageBody() input: InputListPlayersDTO): Promise<OutputPlayerDTO[]> {
    return this.listPlayersService.execute(input);
  }

}