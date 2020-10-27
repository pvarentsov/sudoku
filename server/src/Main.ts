import { GameArea } from './core/model/GameArea';

const grid: number[][] = GameArea.generateBaseGrid();

for (const row of grid) {
  console.log(row.join(' '));
}