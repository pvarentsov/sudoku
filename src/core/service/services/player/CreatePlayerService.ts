import { AssertUtil, CoreError, Optional } from '@sudoku/core/common';
import { Player } from '@sudoku/core/model';
import { InputCreatePlayerDTO, IService, OutputPlayerDTO } from '@sudoku/core/service';
import { IPlayerStore } from '@sudoku/core/store';

export class CreatePlayerService implements IService<InputCreatePlayerDTO, OutputPlayerDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
  ) {}

  public async execute(input: InputCreatePlayerDTO): Promise<OutputPlayerDTO> {
    const existingPlayer: Optional<Player> = await this.playerStore.findPlayer({nickname: input.nickname});
    AssertUtil.isEmpty(existingPlayer, new CoreError('Player already exists.'));

    const player: Player = new Player(input.nickname);
    await this.playerStore.addPlayer(player);

    return new OutputPlayerDTO(player);
  }

}