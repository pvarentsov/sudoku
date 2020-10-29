import { ArrayUtil } from '../../util/ArrayUtil';
import { Game } from '../Game';
import { Cell } from '../Cell';

export class GameFactory {

  public static createGame(): Game {
    const grid: Cell[][] = GameFactory.createGrid();
    GameFactory.randomClearGrid(grid);

    return new Game(grid);
  }

  private static createGrid(): Cell[][] {
    const plainGrid: number[][] = GameFactory.generatePlainGrid();
    const grid: Cell[][] = plainGrid.map(row => row.map(value => new Cell(value, value)));

    return grid;
  }

  private static generatePlainGrid(): number[][] {
    const firstRow: number[] = ArrayUtil.generateSequence(1, 9, {shuffle: true});
    const grid: number[][] = [firstRow];

    for (let row: number = 1; row <= 8; row++) {
      const prevRow: number[] = grid[row-1];

      grid[row] = (row !== 4 && row !== 7)
        ? [prevRow[3], prevRow[4], prevRow[5], prevRow[6], prevRow[7], prevRow[8], prevRow[0], prevRow[1], prevRow[2]]
        : [prevRow[4], prevRow[5], prevRow[6], prevRow[7], prevRow[8], prevRow[0], prevRow[1], prevRow[2], prevRow[3]];
    }

    return grid;
  }

  private static randomClearGrid(grid: Cell[][]): void {
    const clearedPlainIndexes: number[] = ArrayUtil
      .generateSequence(0, 81, {shuffle: true})
      .slice(0, 51);

    for (const index of clearedPlainIndexes) {
      let rowIndex: number = Math.trunc((index+1) / 9);
      let columnIndex: number = ((index+1) % 9) - 1;

      if ((index+1) % 9 === 0) {
        rowIndex--;
        columnIndex++;
      }

      grid[rowIndex][columnIndex].clear();
    }
  }

}