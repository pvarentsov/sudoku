import { AssertUtil } from '@core/common';
import { PlayerError } from '@core/common/errors/PlayerError';
import { Player } from '@core/model';
import { InputRemovePlayerDTO, IService } from '@core/service';
import { IPlayerStore } from '@core/store';

export class RemovePlayerService implements IService<InputRemovePlayerDTO, void> {

  constructor(
    public readonly playerStore: IPlayerStore,
  ) {}

  public async execute(input: InputRemovePlayerDTO): Promise<void> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.id}),
      new PlayerError('Player not found.')
    );

    await this.playerStore.removePlayer(player);
  }

}