export class GatewayEvents {

  static readonly Game: {
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

  static readonly Player: {
    Create: string,
    List  : string,
  } = {
    Create: 'player:create',
    List  : 'player:list',
  };

  static readonly Error: {
    IncorrectValue: string,
    Common        : string,
  } = {
    IncorrectValue: 'errors:incorrect-value',
    Common        : 'errors:common'
  };

}