import { AssertUtil, CoreError } from '@sudoku/core/common';
import { Game, Player } from '@sudoku/core/model';
import { InputRemovePlayerDTO, IService } from '@sudoku/core/service';
import { IGameStore, IPlayerStore } from '@sudoku/core/store';

export class RemovePlayerService implements IService<InputRemovePlayerDTO, void> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputRemovePlayerDTO): Promise<void> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.id}),
      new CoreError('Player not found.')
    );

    const games: Game[] = await this
      .gameStore
      .findGames({playerId: player.id});

    for (const game of games) {
      game.removePlayer(player.id);

      if (game.players.length === 0) {
        await this.gameStore.removeGame(game);
      }
    }

    await this.playerStore.removePlayer(player);
  }

}