import { AssertUtil, CoreError } from '@core/common';
import { Game } from '@core/model';
import { InputPlayGameDTO, IService, OutputGameDTO } from '@core/service';
import { IGameStore } from '@core/store';

export class PlayGameService implements IService<InputPlayGameDTO, OutputGameDTO> {

  constructor(
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputPlayGameDTO): Promise<OutputGameDTO> {
    const game: Game = AssertUtil.notEmpty(
      await this.gameStore.findGame({id: input.gameId}),
      new CoreError('Game not joined.')
    );

    AssertUtil.notEmpty(
      game.players.find(player => input.executorId === player.id),
      new CoreError('Player not joined.')
    );

    await this.gameStore.updateGame(game.play());

    return new OutputGameDTO(game);
  }

}