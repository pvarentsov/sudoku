import { GameFactory } from './core/model/factory/GameFactory';
import { Game } from './core/model/Game';

const game: Game = GameFactory.createGame();

console.log('Right Grid:\n');

for (const row of game.plainRightGrid) {
  console.log(row.join('  '));
}

console.log('\nEntered Grid:\n');

for (const row of game.plainEnteredGrid) {
  console.log(row.join('  '));
}

console.log('\n');