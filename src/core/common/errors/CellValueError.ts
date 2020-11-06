import { CoreError } from '@sudoku/core/common';
import { Coordinate } from '@sudoku/core/model';

export class CellValueError extends CoreError {

  public readonly rowIndex: number;
  public readonly columnIndex: number;

  constructor(message: string, coordinate: Coordinate) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;

    this.rowIndex = coordinate.rowIndex;
    this.columnIndex = coordinate.columnIndex;

    Error.captureStackTrace(this, this.constructor);
  }

}