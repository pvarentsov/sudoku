import { IsUUID } from 'class-validator';

export class InputCreateNewGameDTO {
  @IsUUID()
  public executorId: string;
}