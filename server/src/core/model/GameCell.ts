import { Nullable } from '../type/CommonTypes';
import { Player } from './Player';

export class GameCell {

  private readonly _rightValue: number;
  private _enteredValue: Nullable<number>;
  private _setBy: Nullable<Player>;

  constructor(rightValue: number, enteredValue: Nullable<number>, setBy?: Player) {
    this._rightValue   = rightValue;
    this._enteredValue = enteredValue;
    this._setBy        = setBy || null;
  }

  public get rightValue(): number {
    return this._rightValue;
  }

  public get enteredValue(): Nullable<number> {
    return this._enteredValue;
  }

  public get setBy(): Nullable<Player> {
    return this._setBy;
  }

  public enter(value: Nullable<number>, by?: Player): boolean {
    const isValueRight: boolean = value === this._rightValue;

    if (isValueRight) {
      this._enteredValue = value;
      this._setBy = by || null;
    }

    return isValueRight;
  }

  public isSolved(): boolean {
    return this._rightValue === this._enteredValue;
  }

  public clear(): void {
    this._enteredValue = null;
    this._setBy = null;
  }

}