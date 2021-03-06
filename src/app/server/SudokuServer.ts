import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SudokuModule } from '@sudoku/app/server/modules/SudokuModule';
import { Config } from '@sudoku/core/common';

export class SudokuServer {

  public static async bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(SudokuModule);
    await app.listen(Config.API_PORT, Config.API_HOST);

    Logger.log(`Application is running on: ${await app.getUrl()}`, SudokuServer.name);
  }

}