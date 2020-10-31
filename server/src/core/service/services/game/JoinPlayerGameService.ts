import { AssertUtil, Optional } from '@core/common';
import { Game, Player } from '@core/model';
import { IService, JoinPlayerGameInputDTO, JoinPlayerGameOutputDTO } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class JoinPlayerGameService implements IService<JoinPlayerGameInputDTO, JoinPlayerGameOutputDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: JoinPlayerGameInputDTO): Promise<JoinPlayerGameOutputDTO> {
    let successResult: Optional<{
      data: {game: Game},
      targetPlayers?: string[],
    }>;

    let errorResult: Optional<{
      data: string[],
      targetPlayers?: string[],
    }>;

    try {
      const player: Player = AssertUtil.notEmpty(
        await this.playerStore.findPlayer({id: input.executorId}),
        new Error(`${JoinPlayerGameService.name}: Executor player not found.`)
      );

      const game: Game = AssertUtil.notEmpty(
        await this.gameStore.findGame({id: input.gameId}),
        new Error(`${JoinPlayerGameService.name}: Game not found.`)
      );

      await this.gameStore.updateGame(game.join(player));

      const data: {game: Game} = {game};
      const targetPlayers: string[] = game.players.map(player => player.id);

      successResult = {data, targetPlayers};
    }
    catch (error) {
      errorResult = {data: [error.message], targetPlayers: [input.executorId]};
    }

    return new JoinPlayerGameOutputDTO(successResult, errorResult);
  }

}