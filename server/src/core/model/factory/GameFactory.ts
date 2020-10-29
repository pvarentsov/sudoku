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

      grid[row] = (row !== 3 && row !== 6)
        ? [prevRow[3], prevRow[4], prevRow[5], prevRow[6], prevRow[7], prevRow[8], prevRow[0], prevRow[1], prevRow[2]]
        : [prevRow[4], prevRow[5], prevRow[6], prevRow[7], prevRow[8], prevRow[0], prevRow[1], prevRow[2], prevRow[3]];
    }

    return grid;
  }

  private static randomClearGrid(grid: Cell[][]): void {
    for (const row of grid) {
      const clearColumnNumber: number = 4;

      const clearColumnIndexes: number[] = ArrayUtil
        .generateSequence(0, 8, {shuffle: true})
        .slice(0, clearColumnNumber);

      clearColumnIndexes.forEach(columnIndex => row[columnIndex].clear());
    }
  }

}