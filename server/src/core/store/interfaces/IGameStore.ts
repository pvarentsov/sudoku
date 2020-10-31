import { Game, GameStatus } from '@core/model';

export interface IGameStore {
  addGame(game: Game): Promise<void>;
  findGame(filter: {id?: string}): Promise<Game>;
  findGames(filter?: {status: GameStatus}): Promise<Game[]>;
}