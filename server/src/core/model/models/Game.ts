import { AssertUtil } from '@core/common';
import { Cell, Coordinate, GameStatus, Player } from '@core/model';

export class Game {

  private readonly _id: string;
  private readonly _grid: Cell[][];
  private readonly _players: Player[];
  private _status: GameStatus;

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

  public get players(): Player[] {
    return this._players;
  }

  public get plainRightGrid(): number[][] {
    return this._grid.map(row => row.map(cell => cell.rightValue));
  }

  public get plainEnteredGrid(): number[][] {
    return this._grid.map(row => row.map(cell => cell.enteredValue || 0));
  }

  public play(): Game {
    this._status = GameStatus.Playing;
    return this;
  }

  public enter(coordinate: Coordinate, value: number, player: Player): Game {
    const isGameInPlayingStatus: boolean = this._status === GameStatus.Playing;
    AssertUtil.isTrue(isGameInPlayingStatus, new Error('Game not yet started'));

    const isPlayerJoined: boolean = !! this._players.find(_player => _player.id === player.id);
    AssertUtil.isTrue(isPlayerJoined, new Error('Player does not joined'));

    this._grid[coordinate.rowIndex][coordinate.columnIndex].enter(value, player);

    return this;
  }

  public join(player: Player): Game {
    const isGameInWaitingStatus: boolean = this._status === GameStatus.Waiting;
    AssertUtil.isTrue(isGameInWaitingStatus, new Error('Game already started'));

    const isPlayerAlreadyJoined: boolean = !! this._players.find(_player => _player.id === player.id);
    AssertUtil.isFalse(isPlayerAlreadyJoined, new Error('Player already joined'));

    this._players.push(player);

    return this;
  }

  public isSolved(): boolean {
    return this._grid
      .flat<Cell[][]>()
      .every(cell => cell.isSolved());
  }

}