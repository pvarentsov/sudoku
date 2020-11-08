import { get } from 'env-var';

export class Config {

  static API_PORT: number = get('API_PORT').asPortNumber() || 3000;
  static API_HOST: string = get('API_HOST').asString() || '0.0.0.0';

  static GAME_EMPTY_CELLS_PER_ROW: number = get('GAME_EMPTY_CELLS_PER_ROW').asInt() || 3;

}