import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Client } from 'socket.io';

@Catch()
export class WSExceptionFilter extends BaseWsExceptionFilter {

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const client: Client = host.switchToWs().getClient();
    client.server.emit('errors', exception);

    Logger.error(exception.message, exception.stack, WSExceptionFilter.name);
  }

}