import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SudokuModule } from '@sudoku/app';

export class SudokuServer {

  public static async bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(SudokuModule);
    await app.listen(3000);

    Logger.log(`Application is running on: ${await app.getUrl()}`, SudokuServer.name);
  }


}