import { AssertUtil, GameError } from '@core/common';
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
      new GameError('Executor player not found.', [input.executorId])
    );

    const game: Game = AssertUtil.notEmpty(
      await this.gameStore.findGame({id: input.gameId}),
      new GameError('Game not found.', [input.executorId])
    );

    await this.gameStore.updateGame(game.join(player));

    return new OutputGameDTO(game);
  }

}