import { AssertUtil } from '@sudoku/core/common';
import { CoreError } from '@sudoku/core/common/errors/CoreError';
import { Player } from '@sudoku/core/model';
import { InputRemovePlayerDTO, IService } from '@sudoku/core/service';
import { IPlayerStore } from '@sudoku/core/store';

export class RemovePlayerService implements IService<InputRemovePlayerDTO, void> {

  constructor(
    public readonly playerStore: IPlayerStore,
  ) {}

  public async execute(input: InputRemovePlayerDTO): Promise<void> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.id}),
      new CoreError('Player not found.')
    );

    await this.playerStore.removePlayer(player);
  }

}