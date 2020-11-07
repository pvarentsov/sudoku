import { Injectable } from '@nestjs/common';
import { Optional } from '@sudoku/core/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketPlayerManager {

  private readonly playerSockets: Map<string, Socket[]>;

  constructor() {
    this.playerSockets = new Map();
  }

  public addPlayerSocket(playerId: string, socket: Socket): void {
    const playerSockets: Socket[] = this.playerSockets.get(playerId) || [];
    this.playerSockets.set(playerId, [socket, ...playerSockets]);
  }

  public sendMessageToPlayers<TMessage>(event: string, message: TMessage, playerIds: string[]): void {
    for (const playerId of playerIds) {
      const playerSockets: Optional<Socket[]> = this.playerSockets.get(playerId);

      if (playerSockets) {
        playerSockets.forEach(socket => socket.emit(event, message));
      }
    }
  }

  public getPlayerId(socket: Socket): Optional<string> {
    let resultPlayerId: Optional<string>;

    const playerIds: string[] = Array.from(this.playerSockets.keys());

    for (const playerId of playerIds) {
      const doesPlayerHaveSocket: boolean = !! this.playerSockets
        .get(playerId)
        ?.find(playerSocket => playerSocket.id === socket.id);

      if (doesPlayerHaveSocket) {
        resultPlayerId = playerId;
      }
    }

    return resultPlayerId;
  }

  public removePlayer(playerId: string): void {
    this.playerSockets.delete(playerId);
  }

}