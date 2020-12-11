import { AssertUtil, CellValueError, Nullable } from '@sudoku/core/common';
import { Coordinate, Player } from '@sudoku/core/model';

export class Cell {

  private readonly _rightValue: number;
  private readonly _coordinate: Coordinate;
  private _enteredValue: Nullable<number>;
  private _enteredBy: Nullable<Player>;

  constructor(rightValue: number, enteredValue: Nullable<number>, coordinate: Coordinate, enteredBy?: Player) {
    this._rightValue   = rightValue;
    this._enteredValue = enteredValue;
    this._enteredBy    = enteredBy || null;
    this._coordinate   = coordinate;
  }

  public get rightValue(): number {
    return this._rightValue;
  }

  public get enteredValue(): Nullable<number> {
    return this._enteredValue;
  }

  public get enteredBy(): Nullable<Player> {
    return this._enteredBy;
  }

  public enter(value: Nullable<number>, by?: Player): void {
    const isCelFilled: boolean = Boolean(this._enteredValue);
    AssertUtil.isFalse(isCelFilled, new CellValueError('Cell already filled.', this._coordinate));

    const isValueRight: boolean = value === this._rightValue;
    AssertUtil.isTrue(isValueRight, new CellValueError('Entered incorrect value.', this._coordinate));

    this._enteredValue = value;
    this._enteredBy = by || null;
  }

  public isSolved(): boolean {
    return this._rightValue === this._enteredValue;
  }

  public clear(): void {
    this._enteredValue = null;
    this._enteredBy = null;
  }

}