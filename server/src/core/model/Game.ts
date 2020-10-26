import { GameStatus } from './enum/GameStatus';
import { Player } from './Player';

export class Game {

  private readonly id: string;

  private readonly participants: Player[];

  private readonly status: GameStatus;

}