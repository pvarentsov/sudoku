import { IsUUID } from 'class-validator';

export class InputRemovePlayerDTO {
  @IsUUID()
  public id: string;
}