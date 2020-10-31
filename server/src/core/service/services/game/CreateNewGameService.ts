import { AssertUtil, Optional } from '@core/common';
import { Game, GameFactory, Player } from '@core/model';
import { CreateGameInputDTO, CreateGameOutputDTO, IService } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class CreateNewGameService implements IService<CreateGameInputDTO, CreateGameOutputDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: CreateGameInputDTO): Promise<CreateGameOutputDTO> {
    let successResult: Optional<{
      data: { game: Game },
      targetPlayers?: string[],
    }>;

    let errorResult: Optional<{
      data: string[],
      targetPlayers?: string[],
    }>;

    try {
      const player: Player = AssertUtil.notEmpty(
        await this.playerStore.findPlayer({id: input.executorId}),
        new Error(`${CreateNewGameService.name}: Executor player not found.`)
      );

      const game: Game = GameFactory
        .createGame()
        .join(player);

      await this.gameStore.addGame(game);

      successResult = {data: {game}};
    }
    catch (error) {
      errorResult = {data: [error.message], targetPlayers: [input.executorId]};
    }

    return new CreateGameOutputDTO(successResult, errorResult);
  }

}