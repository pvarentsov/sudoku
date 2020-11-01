import { Player } from '@sudoku/core/model';

export class OutputPlayerDTO {

  public id: string;
  public nickname: string;

  constructor(player: Player) {
    this.id = player.id;
    this.nickname = player.nickname;
  }
}