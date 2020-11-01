export class GameError extends Error {

  public readonly message: string;
  public readonly targets: string[];

  constructor(message: string, targets: string[]) {
    super();

    this.name = this.constructor.name;
    this.message = message;
    this.targets = targets;

    Error.captureStackTrace(this, this.constructor);
  }

}