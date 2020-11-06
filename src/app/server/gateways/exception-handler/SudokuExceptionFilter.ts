import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { CellValueError } from '@sudoku/core/common/errors/CellValueError';
import { Socket } from 'socket.io';

@Catch()
export class SudokuExceptionFilter extends BaseWsExceptionFilter {

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const client: Socket = host.switchToWs().getClient();

    if (exception instanceof CellValueError) {
      client.emit('errors:incorrect-value', exception);
    }
    else {
      client.emit('errors:common', exception);
    }

    Logger.error(exception.message, exception.stack, SudokuExceptionFilter.name);
  }

}