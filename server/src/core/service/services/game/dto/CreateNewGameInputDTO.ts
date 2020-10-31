import { IServiceInputData } from '@core/service';
import { IsUUID } from 'class-validator';

export class CreateNewGameInputDTO implements IServiceInputData {
  @IsUUID()
  public executorId: string;
}