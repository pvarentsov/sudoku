import 'module-alias/register';
import { Game, GameFactory } from '@sudoku/core/model';

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