import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { GatewayEvents } from '@sudoku/app/server/gateways/events/GatewayEvents';
import { CellValueError } from '@sudoku/core/common';
import { Socket } from 'socket.io';

@Catch()
export class SudokuExceptionFilter extends BaseWsExceptionFilter {

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const client: Socket = host.switchToWs().getClient();

    if (exception instanceof CellValueError) {
      client.emit(GatewayEvents.Errors.IncorrectValue, exception);
    }
    else {
      client.emit(GatewayEvents.Errors.Common, exception);
    }

    Logger.error(exception.message, exception.stack, SudokuExceptionFilter.name);
  }

}