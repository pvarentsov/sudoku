export class GatewayEvents {

  static Game: {
    Create    : string,
    UpdateList: string,
    List      : string,
    Play      : string,
    JoinPlayer: string,
    Leave     : string,
    EnterValue: string,
  } = {
    Create    : 'game:create',
    UpdateList: 'game:update-list',
    List      : 'game:list',
    Play      : 'game:play',
    JoinPlayer: 'game:join-player',
    Leave     : 'game:leave',
    EnterValue: 'game:enter-value',
  };

  static Player: {
    Create    : string,
    UpdateList: string,
    List      : string,
  } = {
    Create    : 'player:create',
    UpdateList: 'player:update-list',
    List      : 'player:list',
  };

}