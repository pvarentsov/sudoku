import { IServiceInputData } from '@core/service';
import { IsUUID } from 'class-validator';

export class PlayGameInputDTO implements IServiceInputData {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

}