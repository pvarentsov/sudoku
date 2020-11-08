import { IsString, Length } from 'class-validator';

export class InputCreatePlayerDTO {
  @IsString()
  @Length(2, 20)
  public nickname: string;
}