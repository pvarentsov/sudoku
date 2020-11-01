import { AssertUtil, GameError } from '@core/common';
import { Game, GameFactory, Player } from '@core/model';
import { InputCreateNewGameDTO, IService, OutputGameDTO } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class CreateNewGameService implements IService<InputCreateNewGameDTO, OutputGameDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.executorId}),
      new GameError('Executor player not found.', [input.executorId])
    );

    const game: Game = GameFactory
      .createGame()
      .join(player);

    await this.gameStore.addGame(game);

    return new OutputGameDTO(game);
  }

}