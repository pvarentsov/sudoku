import { Cell, Game, Player } from '@core/model';

export class OutputGameDTO {

  public id: string;
  public grid: Cell[][];
  public players: Player[];
  public winner?: Player;

  constructor(game: Game, winner?: Player) {
    this.id = game.id;
    this.grid = game.grid;
    this.players = game.players;
    this.winner = winner;
  }

}