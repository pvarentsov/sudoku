import { Nullable, Optional } from '../type/CommonTypes';
import { Player } from './Player';

export class GameCell {

  public readonly rightValue: number;
  public readonly currentValue: Nullable<number>;
  public readonly setBy: Optional<Player>;

  constructor(rightValue: number, currentValue: Nullable<number>, setBy?: Player) {
    this.rightValue   = rightValue;
    this.currentValue = currentValue;
    this.setBy        = setBy ;
  }

}