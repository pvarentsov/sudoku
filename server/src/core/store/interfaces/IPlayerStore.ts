import { Optional } from '@core/common';
import { Player } from '@core/model';

export interface IPlayerStore {
  addPlayer(player: Player): Promise<void>;
  updatePlayer(player: Player): Promise<void>;
  removePlayer(player: Player): Promise<void>;
  findPlayer(filter: {id?: string, nickname?: string}): Promise<Optional<Player>>;
  findPlayers(): Promise<Player[]>;
}