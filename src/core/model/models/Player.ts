import { v4 } from 'uuid';

export class Player {

  private readonly _id: string;
  private readonly _nickname: string;
  private _rating: number;

  constructor(nickname: string) {
    this._id       = v4();
    this._nickname = nickname;
    this._rating   = 0;
  }

  public get id(): string {
    return this._id;
  }

  public get nickname(): string {
    return this._nickname;
  }

  public get rating(): number {
    return this._rating;
  }

  public rate(): Player {
    this._rating += 1;
    return this;
  }

}