import { GameStatus } from './enum/GameStatus';
import { GameCell } from './GameCell';

export class Game {

  public readonly _id: string;
  public readonly _grid: GameCell[][];
  public readonly _status: GameStatus;

  constructor(grid: GameCell[][]) {
    this._id     = 'TODO: uuid v4';
    this._grid   = grid;
    this._status = GameStatus.Waiting;
  }

  public get id(): string {
    return this._id;
  }

  public get grid(): GameCell[][] {
    return this._grid;
  }

  public get status(): GameStatus {
    return this._status;
  }

}