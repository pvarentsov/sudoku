import { Cell, Game, GameStatus, Player } from '@sudoku/core/model';

export class OutputGameDTO {

  public id: string;
  public grid: Cell[][];
  public players: Player[];
  public status: GameStatus;
  public winner?: Player;

  constructor(game: Game, winner?: Player) {
    this.id = game.id;
    this.grid = game.grid;
    this.players = game.players;
    this.status = game.status;
    this.winner = winner;
  }

}