import { IsUUID } from 'class-validator';

export class InputListPlayersDTO {
  @IsUUID()
  public executorId: string;
}