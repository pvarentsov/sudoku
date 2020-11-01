import { Inject } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CoreDITokens } from '@sudoku/core/common';
import { InputCreateNewGameDTO, IService, OutputGameDTO } from '@sudoku/core/service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GameEventGateway {

  @WebSocketServer()
  private readonly socketServer: Server;

  @Inject(CoreDITokens.CreateNewGameService)
  private readonly createNewGameService: IService<InputCreateNewGameDTO, OutputGameDTO>;

  @SubscribeMessage('game:create')
  public async createGame(@MessageBody() input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    return this.createNewGameService.execute(input);
  }

}