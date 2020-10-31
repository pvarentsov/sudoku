import { Game } from '@core/model';
import { IServiceOutputData } from '@core/service';

export class CreateGameOutputDTO implements IServiceOutputData<{game: Game}, string[]> {

  constructor(
    public success?: {
      data: {game: Game},
      targetPlayers?: string[],
    },
    public error?: {
      data: string[],
      targetPlayers?: string[],
    },
  ) {}

}