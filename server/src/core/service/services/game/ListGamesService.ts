import { Game, GameStatus } from '@sudoku/core/model';
import { IService, OutputGameDTO } from '@sudoku/core/service';
import { InputListGamesDTO } from '@sudoku/core/service/services/game/dto/InputListGamesDTO';
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