import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class SudokuExceptionFilter extends BaseWsExceptionFilter {

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const client: Socket = host.switchToWs().getClient();
    client.emit('errors', exception);

    Logger.error(exception.message, exception.stack, SudokuExceptionFilter.name);
  }

}