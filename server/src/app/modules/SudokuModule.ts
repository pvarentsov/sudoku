import { Module } from '@nestjs/common';
import { InMemoryGameStoreAdapter, InMemoryPlayerStoreAdapter } from '@sudoku/adapter';
import { SocketPlayerManager } from '@sudoku/app/gateways/socket-manager/SocketPlayerManager';
import { SudokuEventGateway } from '@sudoku/app/gateways/SudokuEventGateway';
import { CoreDITokens } from '@sudoku/core/common';
import {
  CreateNewGameService,
  CreatePlayerService,
  EnterValueGameService,
  JoinPlayerGameService,
  PlayGameService,
  RemovePlayerService
} from '@sudoku/core/service';

@Module({
  providers: [

    // Gateways

    SudokuEventGateway,
    SocketPlayerManager,

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
  ],
})
export class SudokuModule {}