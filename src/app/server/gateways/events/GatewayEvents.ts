export class GatewayEvents {

  static Game: {
    Create    : string,
    List      : string,
    Play      : string,
    JoinPlayer: string,
    Leave     : string,
    EnterValue: string,
  } = {
    Create    : 'game:create',
    List      : 'game:list',
    Play      : 'game:play',
    JoinPlayer: 'game:join-player',
    Leave     : 'game:leave',
    EnterValue: 'game:enter-value',
  };

  static Player: {
    Create    : string,
    List      : string,
  } = {
    Create    : 'player:create',
    List      : 'player:list',
  };

  static Errors: {
    IncorrectValue: string,
    Common        : string,
  } = {
    IncorrectValue: 'errors:incorrect-value',
    Common        : 'errors:common'
  };

}