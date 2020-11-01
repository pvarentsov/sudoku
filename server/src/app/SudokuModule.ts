import { Module, Provider } from '@nestjs/common';
import { InMemoryGameStoreAdapter, InMemoryPlayerStoreAdapter } from '@sudoku/adapter';
import { CoreDITokens } from '@sudoku/core/common';
import {
  CreateNewGameService,
  CreatePlayerService,
  EnterValueGameService,
  JoinPlayerGameService,
  PlayGameService,
  RemovePlayerService
} from '@sudoku/core/service';

const providers: Provider[] = [

  // Store

  {
    provide: CoreDITokens.GameStore,
    useClass: InMemoryGameStoreAdapter
  },
  {
    provide: CoreDITokens.PlayerStore,
    useClass: InMemoryPlayerStoreAdapter
  },

  // Game services

  {
    provide: CoreDITokens.CreateNewGameService,
    useFactory: (playerStore, gameStore) => new CreateNewGameService(playerStore, gameStore),
    inject: [CoreDITokens.PlayerStore, CoreDITokens.GameStore]
  },
  {
    provide: CoreDITokens.EnterValueGameService,
    useFactory: (playerStore, gameStore) => new EnterValueGameService(playerStore, gameStore),
    inject: [CoreDITokens.PlayerStore, CoreDITokens.GameStore]
  },
  {
    provide: CoreDITokens.JoinPlayerGameService,
    useFactory: (playerStore, gameStore) => new JoinPlayerGameService(playerStore, gameStore),
    inject: [CoreDITokens.PlayerStore, CoreDITokens.GameStore]
  },
  {
    provide: CoreDITokens.PlayGameService,
    useFactory: (gameStore) => new PlayGameService(gameStore),
    inject: [CoreDITokens.GameStore]
  },

  // Player services

  {
    provide: CoreDITokens.CreatePlayerService,
    useFactory: (playerStore) => new CreatePlayerService(playerStore),
    inject: [CoreDITokens.PlayerStore]
  },
  {
    provide: CoreDITokens.RemovePlayerService,
    useFactory: (playerStore) => new RemovePlayerService(playerStore),
    inject: [CoreDITokens.PlayerStore]
  },
];

@Module({
  providers: providers,
})
export class SudokuModule {}