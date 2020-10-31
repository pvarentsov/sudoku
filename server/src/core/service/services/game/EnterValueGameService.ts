import { AssertUtil, Optional } from '@core/common';
import { Coordinate, Game, Player } from '@core/model';
import { EnterValueGameInputDTO, EnterValueGameOutputDTO, IService } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class EnterValueGameService implements IService<EnterValueGameInputDTO, EnterValueGameOutputDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: EnterValueGameInputDTO): Promise<EnterValueGameOutputDTO> {
    let successResult: Optional<{
      data: {game: Game, solved?: Player},
      targetPlayers?: string[],
    }>;

    let errorResult: Optional<{
      data: string[],
      targetPlayers?: string[],
    }>;

    try {
      const game: Game = AssertUtil.notEmpty(
        await this.gameStore.findGame({id: input.gameId}),
        new Error(`${EnterValueGameService.name}: Game not found.`)
      );

      const player: Player = AssertUtil.notEmpty(
        game.players.find(player => input.executorId === player.id),
        new Error(`${EnterValueGameService.name}: Player not joined.`)
      );

      const coordinate: Coordinate = new Coordinate(input.rowIndex, input.columnIndex);
      const value: number = input.value;

      await this.gameStore.updateGame(game.enter(coordinate, value, player));

      if (game.isSolved()) {
        player.rate();
        await this.playerStore.updatePlayer(player);
      }

      const data: {game: Game, solved?: Player} = {game: game, solved: game.isSolved() ? player : undefined};
      const targetPlayers: string[] = game.players.map(player => player.id);

      successResult = {data, targetPlayers};
    }
    catch (error) {
      errorResult = {data: [error.message], targetPlayers: [input.executorId]};
    }

    return new EnterValueGameOutputDTO(successResult, errorResult);
  }

}