import { Game, Player } from '@core/model';
import { IServiceOutputData } from '@core/service';

export class EnterValueGameOutputDTO implements IServiceOutputData<{game: Game, solved?: Player}, string[]> {

  constructor(
    public success?: {
      data: {game: Game, solved?: Player},
      targetPlayers?: string[],
    },
    public error?: {
      data: string[],
      targetPlayers?: string[],
    },
  ) {}

}