import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { GatewayEvents } from '@sudoku/app/server/gateways/events/GatewayEvents';
import { CellValueError, CoreError } from '@sudoku/core/common';
import { Socket } from 'socket.io';

@Catch()
export class SudokuExceptionFilter extends BaseWsExceptionFilter {

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const client: Socket = host.switchToWs().getClient();

    if (exception instanceof CellValueError) {
      client.emit(GatewayEvents.Errors.IncorrectValue, exception);
    }
    else if (exception instanceof HttpException) {
      const response: string|Record<string, any> = exception.getResponse() as string|Record<string, unknown>;

      const message: string = typeof response === 'string'
        ? response
        : response.message || 'Internal Error';

      client.emit(GatewayEvents.Errors.Common, new CoreError(message));
    }
    else {
      client.emit(GatewayEvents.Errors.Common, exception);
    }

    Logger.error(exception.message, exception.stack, SudokuExceptionFilter.name);
  }

}