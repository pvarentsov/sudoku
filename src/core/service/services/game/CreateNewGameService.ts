import { AssertUtil, CoreError } from '@sudoku/core/common';
import { Game, GameFactory, Player } from '@sudoku/core/model';
import { InputCreateNewGameDTO, IService, OutputGameDTO } from '@sudoku/core/service';
import { IGameStore, IPlayerStore } from '@sudoku/core/store';

export class CreateNewGameService implements IService<InputCreateNewGameDTO, OutputGameDTO> {

  constructor(
    public readonly playerStore: IPlayerStore,
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputCreateNewGameDTO): Promise<OutputGameDTO> {
    const player: Player = AssertUtil.notEmpty(
      await this.playerStore.findPlayer({id: input.executorId}),
      new CoreError('Executor player not found.')
    );

    const game: Game = GameFactory
      .createGame()
      .join(player);

    await this.gameStore.addGame(game);

    return new OutputGameDTO(game);
  }

}