import { AssertUtil, Optional } from '@core/common';
import { Game } from '@core/model';
import { IService, PlayGameInputDTO, PlayGameOutputDTO } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class PlayGameService implements IService<PlayGameInputDTO, PlayGameOutputDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: PlayGameInputDTO): Promise<PlayGameOutputDTO> {
    let successResult: Optional<{
      data: {game: Game},
      targetPlayers?: string[],
    }>;

    let errorResult: Optional<{
      data: string[],
      targetPlayers?: string[],
    }>;

    try {
      const game: Game = AssertUtil.notEmpty(
        await this.gameStore.findGame({id: input.gameId}),
        new Error(`${PlayGameService.name}: Game not found.`)
      );

      AssertUtil.notEmpty(
        game.players.find(player => input.executorId === player.id),
        new Error(`${PlayGameService.name}: Player not joined.`)
      );

      await this.gameStore.updateGame(game.play());

      const data: {game: Game} = {game};
      const targetPlayers: string[] = game.players.map(player => player.id);

      successResult = {data, targetPlayers};
    }
    catch (error) {
      errorResult = {data: [error.message], targetPlayers: [input.executorId]};
    }

    return new PlayGameOutputDTO(successResult, errorResult);
  }

}