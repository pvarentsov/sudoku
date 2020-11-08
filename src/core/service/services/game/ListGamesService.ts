import { Game, GameStatus } from '@sudoku/core/model';
import { InputListGamesDTO, IService, OutputGameDTO } from '@sudoku/core/service';
import { IGameStore } from '@sudoku/core/store';

export class ListGamesService implements IService<InputListGamesDTO, OutputGameDTO[]> {

  constructor(
    public readonly gameStore: IGameStore,
  ) {}

  public async execute(input: InputListGamesDTO): Promise<OutputGameDTO[]> {
    const games: Game[] = await this.gameStore.findGames({status: GameStatus.Waiting});
    return games.map(game => new OutputGameDTO(game));
  }

}