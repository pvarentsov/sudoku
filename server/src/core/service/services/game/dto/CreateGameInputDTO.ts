import { IServiceInputData } from '@core/service';
import { IsUUID } from 'class-validator';


export class CreateGameInputDTO implements IServiceInputData {
  @IsUUID()
  public executorId: string;
}