import { IServiceInputData } from '@core/service';
import { IsUUID } from 'class-validator';

export class JoinPlayerGameInputDTO implements IServiceInputData {

  @IsUUID()
  public executorId: string;

  @IsUUID()
  public gameId: string;

}