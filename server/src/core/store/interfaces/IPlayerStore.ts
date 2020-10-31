import { Player } from '@core/model';

export interface IPlayerStore {
  addPlayer(Player: Player): Promise<void>;
  findPlayer(filter: {id?: string, nickname?: string}): Promise<Player>;
  findPlayers(filter?: {rating?: number}): Promise<Player[]>;
}