export * from '@core/service/interfaces/IService';

// Game

export * from '@core/service/services/game/dto/InputCreateNewGameDTO';
export * from '@core/service/services/game/dto/InputEnterValueGameDTO';
export * from '@core/service/services/game/dto/InputJoinPlayerGameDTO';
export * from '@core/service/services/game/dto/InputPlayGameDTO';
export * from '@core/service/services/game/dto/OutputGameDTO';

export * from '@core/service/services/game/CreateNewGameService';
export * from '@core/service/services/game/EnterValueGameService';
export * from '@core/service/services/game/JoinPlayerGameService';
export * from '@core/service/services/game/PlayGameService';

// Player

export * from '@core/service/services/player/dto/InputCreatePlayerDTO';
export * from '@core/service/services/player/dto/InputRemovePlayerDTO';
export * from '@core/service/services/player/dto/OutputPlayerDTO';

export * from '@core/service/services/player/CreatePlayerService';
export * from '@core/service/services/player/RemovePlayerService';