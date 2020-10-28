import { Nullable, Optional } from '../type/CommonTypes';
import { Player } from './Player';

export class GameCell {

  public readonly rightValue: number;
  public currentValue: Nullable<number>;
  public setBy: Optional<Player>;

  constructor(rightValue: number, currentValue: Nullable<number>, setBy?: Player) {
    this.rightValue   = rightValue;
    this.currentValue = currentValue;
    this.setBy        = setBy ;
  }

  public setValue(value: Nullable<number>, by?: Player): void {
    this.currentValue = value;
    this.setBy = by;
  }

}