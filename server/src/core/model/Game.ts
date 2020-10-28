import { GameStatus } from './enum/GameStatus';
import { GameGridFactory } from './factory/GameGridFactory';
import { GameCell } from './GameCell';

export class Game {

  public readonly id: string;
  public readonly grid: GameCell[][];
  public readonly status: GameStatus;

  constructor() {
    this.id = 'TODO: uuid v4';
    this.grid = GameGridFactory.createGrid();
    this.status = GameStatus.Waiting;
  }

}