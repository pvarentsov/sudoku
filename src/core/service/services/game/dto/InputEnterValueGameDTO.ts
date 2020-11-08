import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class InputEnterValueGameDTO {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

  @IsNumber()
  @Max(8)
  @Min(0)
  public rowIndex: number;

  @IsNumber()
  @Max(8)
  @Min(0)
  public columnIndex: number;

  @IsNumber()
  @Max(9)
  @Min(1)
  public value: number;

}