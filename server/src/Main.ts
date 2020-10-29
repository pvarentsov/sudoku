import { GameFactory } from './core/model/factory/GameFactory';
import { Game } from './core/model/Game';

const game: Game = GameFactory.createGame();
console.log(game);