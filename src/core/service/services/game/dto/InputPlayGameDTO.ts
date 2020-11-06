import { IsUUID } from 'class-validator';

export class InputPlayGameDTO {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

}