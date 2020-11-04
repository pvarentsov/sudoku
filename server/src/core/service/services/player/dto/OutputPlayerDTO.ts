import { Player } from '@sudoku/core/model';

export class OutputPlayerDTO {

  public id: string;
  public nickname: string;
  public rating: number;

  constructor(player: Player) {
    this.id = player.id;
    this.nickname = player.nickname;
    this.rating = player.rating;
  }
}