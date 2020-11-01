import { Optional } from '@core/common';
import { Player } from '@core/model';
import { IPlayerStore } from '@core/store';

export class InMemoryPlayerStoreAdapter implements IPlayerStore {

  private readonly store: Map<string, Player>;

  constructor() {
    this.store = new Map();
  }

  public async addPlayer(player: Player): Promise<void> {
    this.store.set(player.id, player);
  }
  public async updatePlayer(player: Player): Promise<void> {
    this.store.set(player.id, player);
  }
  public async removePlayer(player: Player): Promise<void> {
    this.store.delete(player.id);
  }

  public async findPlayer(filter: {id?: string, nickname?: string}): Promise<Optional<Player>> {
    let players: Player[] = Array.from(this.store.values());

    if (filter.id) {
      players = players.filter(player => player.id === filter.id);
    }
    if (filter.nickname) {
      players = players.filter(player => player.nickname === filter.nickname);
    }

    return players.find(player => player);
  }

  public async findPlayers(): Promise<Player[]> {
    return Array.from(this.store.values());
  }

}