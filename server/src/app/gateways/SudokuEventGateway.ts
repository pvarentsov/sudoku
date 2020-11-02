import { Inject, UseFilters } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SudokuExceptionFilter } from '@sudoku/app/gateways/exception-handler/SudokuExceptionFilter';
import { SocketPlayerManager } from '@sudoku/app/gateways/socket-manager/SocketPlayerManager';
import { CoreDITokens } from '@sudoku/core/common';
import { InputCreateNewGameDTO, InputCreatePlayerDTO, IService, OutputGameDTO, OutputPlayerDTO } from '@sudoku/core/service';
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

    @Inject(CoreDITokens.CreatePlayerService)
    private readonly createPlayerService: IService<InputCreatePlayerDTO, OutputPlayerDTO>,
  ) {}
  
  @SubscribeMessage('game:create')
  public async createGame(client: Socket, @MessageBody() input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    return this.createNewGameService.execute(input);
  }

  @SubscribeMessage('player:create')
  public async createPlayer(@ConnectedSocket() socket: Socket, @MessageBody() input: InputCreatePlayerDTO): Promise<OutputPlayerDTO> {
    const player: OutputPlayerDTO = await this.createPlayerService.execute(input);
    this.socketPlayerManager.addPlayerSocket(player.id, socket);

    return player;
  }

}