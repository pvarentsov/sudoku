import { Cell } from './Cell';
import { Coordinate } from './Coordinate';
import { GameStatus } from './enum/GameStatus';
import { Player } from './Player';

export class Game {

  public readonly _id: string;
  public readonly _grid: Cell[][];
  public readonly _status: GameStatus;

  constructor(grid: Cell[][]) {
    this._id     = 'TODO: uuid v4';
    this._grid   = grid;
    this._status = GameStatus.Waiting;
  }

  public get id(): string {
    return this._id;
  }

  public get grid(): Cell[][] {
    return this._grid;
  }

  public get status(): GameStatus {
    return this._status;
  }

  public get plainRightGrid(): number[][] {
    return this._grid.map(row => row.map(cell => cell.rightValue));
  }

  public get plainEnteredGrid(): number[][] {
    return this._grid.map(row => row.map(cell => cell.enteredValue || 0));
  }

  public enter(coordinate: Coordinate, value: number, player: Player): boolean {
    return this._grid[coordinate.rowIndex][coordinate.columnIndex].enter(value, player);
  }

  public isSolved(): boolean {
    return this._grid
      .flat<Cell[][]>()
      .every(cell => cell.isSolved());
  }

}