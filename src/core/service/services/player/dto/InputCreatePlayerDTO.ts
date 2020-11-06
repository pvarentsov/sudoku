import { IsString } from 'class-validator';

export class InputCreatePlayerDTO {
  @IsString()
  public nickname: string;
}