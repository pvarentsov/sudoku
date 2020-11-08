import { AssertUtil, CoreError } from '@sudoku/core/common';
import { Game, Player } from '@sudoku/core/model';
import { IService, OutputGameDTO } from '@sudoku/core/service';
import { InputLeaveGameDTO } from '@sudoku/core/service/services/game/dto/InputLeaveGameDTO';
import { IGameStore, IPlayerStore } from '@sudoku/core/store';

export class LeaveGameService implements IService<InputLeaveGameDTO, OutputGameDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputLeaveGameDTO): Promise<OutputGameDTO> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.executorId}),
      new CoreError('Executor player not found.')
    );

    const game: Game = AssertUtil.notEmpty(
      await this.gameStore.findGame({id: input.gameId}),
      new CoreError('Game not found.')
    );

    game.removePlayer(player.id);

    if (game.players.length === 0) {
      await this.gameStore.removeGame(game);
    }
    else {
      await this.gameStore.updateGame(game);
    }

    return new OutputGameDTO(game);
  }

}