import { Player } from '@sudoku/core/model';
import { IService, OutputPlayerDTO } from '@sudoku/core/service';
import { InputListPlayersDTO } from '@sudoku/core/service/services/player/dto/InputListPlayersDTO';
import { IPlayerStore } from '@sudoku/core/store';

export class ListPlayersService implements IService<InputListPlayersDTO, OutputPlayerDTO[]> {

  constructor(
    public readonly playerStore: IPlayerStore,
  ) {}

  public async execute(input: InputListPlayersDTO): Promise<OutputPlayerDTO[]> {
    const players: Player[] = await this.playerStore.findPlayers();
    return players.map(player => new OutputPlayerDTO(player));
  }

}