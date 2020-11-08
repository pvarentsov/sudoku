import { IsUUID } from 'class-validator';

export class InputLeaveGameDTO {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

}