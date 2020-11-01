import { Optional } from '@core/common';
import { Game, GameStatus } from '@core/model';

export interface IGameStore {
  addGame(game: Game): Promise<void>;
  updateGame(game: Game): Promise<void>;
  removeGame(game: Game): Promise<void>;
  findGame(filter: {id?: string}): Promise<Optional<Game>>;
  findGames(filter: {status?: GameStatus}): Promise<Game[]>;
}