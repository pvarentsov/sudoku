import { ArrayUtil } from '../../util/ArrayUtil';
import { GameCell } from '../GameCell';

export class GameGridFactory {

  public static createGrid(): GameCell[][] {
    const plainGrid: number[][] = GameGridFactory.generatePlainGrid();
    const grid: GameCell[][] = plainGrid.map(row => row.map(value => new GameCell(value, value)));

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

}