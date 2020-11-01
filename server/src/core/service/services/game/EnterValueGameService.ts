import { AssertUtil, Optional } from '@core/common';
import { GameError } from '@core/common/errors/GameError';
import { Coordinate, Game, Player } from '@core/model';
import { InputEnterValueGameDTO, IService, OutputGameDTO } from '@core/service';
import { IGameStore, IPlayerStore } from '@core/store';

export class EnterValueGameService implements IService<InputEnterValueGameDTO, OutputGameDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputEnterValueGameDTO): Promise<OutputGameDTO> {
    const game: Game = AssertUtil.notEmpty(
      await this.gameStore.findGame({id: input.gameId}),
      new GameError('Game not found.', [input.executorId])
    );

    const player: Player = AssertUtil.notEmpty(
      game.players.find(player => input.executorId === player.id),
      new GameError('Player not joined.', [input.executorId])
    );

    const coordinate: Coordinate = new Coordinate(input.rowIndex, input.columnIndex);
    const value: number = input.value;

    await this.gameStore.updateGame(game.enter(coordinate, value, player));

    let winner: Optional<Player>;

    if (game.isSolved()) {
      winner = player.rate();
      await this.playerStore.updatePlayer(winner);
    }

    return new OutputGameDTO(game, winner);
  }

}