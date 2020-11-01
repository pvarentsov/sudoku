import { AssertUtil, Optional } from '@core/common';
import { CoreError } from '@core/common/errors/CoreError';
import { Player } from '@core/model';
import { InputCreatePlayerDTO, IService, OutputPlayerDTO } from '@core/service';
import { IPlayerStore } from '@core/store';

export class CreatePlayerService implements IService<InputCreatePlayerDTO, OutputPlayerDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
  ) {}

  public async execute(input: InputCreatePlayerDTO): Promise<OutputPlayerDTO> {
    const existingPlayer: Optional<Player> = await this.playerStore.findPlayer({nickname: input.nickname});
    AssertUtil.isFalse(!existingPlayer, new CoreError('Player already exists.'));

    const player: Player = new Player(input.nickname);
    await this.playerStore.addPlayer(player);

    return new OutputPlayerDTO(player);
  }

}