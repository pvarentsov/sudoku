import { Optional } from '@sudoku/core/common';
import { Game, GameStatus } from '@sudoku/core/model';
import { IGameStore } from '@sudoku/core/store';

export class InMemoryGameStoreAdapter implements IGameStore {

  private readonly store: Map<string, Game>;

  constructor() {
    this.store = new Map();
  }

  public async addGame(game: Game): Promise<void> {
    this.store.set(game.id, game);
  }
  public async updateGame(game: Game): Promise<void> {
    this.store.set(game.id, game);
  }
  public async removeGame(game: Game): Promise<void> {
    this.store.delete(game.id);
  }

  public async findGame(filter: {id?: string}): Promise<Optional<Game>> {
    return Array
      .from(this.store.values())
      .find(game => game.id === filter.id);
  }

  public async findGames(filter: {status?: GameStatus, playerId?: string}): Promise<Game[]> {
    let games: Game[] = Array
      .from(this.store.values())
      .sort((left, right) => right.players.length - left.players.length);

    if (filter.status !== undefined) {
      games = games.filter(game => game.status === filter.status);
    }
    if (filter.playerId !== undefined) {
      games = games.filter(game => game.players.find(player => player.id === filter.playerId));
    }

    return games;
  }

}