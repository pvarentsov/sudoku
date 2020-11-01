import { IsUUID } from 'class-validator';

export class InputJoinPlayerGameDTO {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

}