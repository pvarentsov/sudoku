import { IsUUID } from 'class-validator';

export class InputListGamesDTO {
  @IsUUID()
  public executorId: string;
}