import { AssertUtil, CoreError } from '@core/common';
import { Game, Player } from '@core/model';
import { InputJoinPlayerGameDTO, IService, OutputGameDTO } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class JoinPlayerGameService implements IService<InputJoinPlayerGameDTO, OutputGameDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputJoinPlayerGameDTO): Promise<OutputGameDTO> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.executorId}),
      new CoreError('Executor player not found.')
    );

    const game: Game = AssertUtil.notEmpty(
      await this.gameStore.findGame({id: input.gameId}),
      new CoreError('Game not found.')
    );

    await this.gameStore.updateGame(game.join(player));

    return new OutputGameDTO(game);
  }

}