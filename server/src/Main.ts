import { GameFactory } from './core/model/factory/GameFactory';
import { Game } from './core/model/Game';

const game: Game = GameFactory.createGame();

for (const row of game.plainGrid) {
  console.log(row.join(' '));
}