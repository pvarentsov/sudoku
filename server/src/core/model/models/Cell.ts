import { AssertUtil, Nullable } from '@sudoku/core/common';
import { Player } from '@sudoku/core/model';

export class Cell {

  private readonly _rightValue: number;
  private _enteredValue: Nullable<number>;
  private _enteredBy: Nullable<Player>;

  constructor(rightValue: number, enteredValue: Nullable<number>, enteredBy?: Player) {
    this._rightValue   = rightValue;
    this._enteredValue = enteredValue;
    this._enteredBy    = enteredBy || null;
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
    AssertUtil.isFalse(isCelFilled, new Error('Cell already filled.'));

    const isValueRight: boolean = value === this._rightValue;
    AssertUtil.isTrue(isValueRight, new Error('Entered incorrect value.'));

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