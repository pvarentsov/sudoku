import { Inject, UseFilters } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WSExceptionFilter } from '@sudoku/app/gateways/exception-handler/WSExceptionFilter';
import { CoreDITokens } from '@sudoku/core/common';
import { InputCreateNewGameDTO, IService, OutputGameDTO } from '@sudoku/core/service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@UseFilters(WSExceptionFilter)
export class GameEventGateway {

  @WebSocketServer()
  private readonly socketServer: Server;

  @Inject(CoreDITokens.CreateNewGameService)
  private readonly createNewGameService: IService<InputCreateNewGameDTO, OutputGameDTO>;

  @SubscribeMessage('game:create')
  public async createGame(client: Socket, @MessageBody() input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    return this.createNewGameService.execute(input);
  }

}