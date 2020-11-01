import 'module-alias/register';
import { SudokuServer } from '@sudoku/app';

(async (): Promise<void> => {
  await SudokuServer.bootstrap();
})();