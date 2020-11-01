export class StoreError extends Error {

  public readonly message: string;
  public readonly targets: string[];

  private constructor(message: string, targets: string[]) {
    super();

    this.name = this.constructor.name;
    this.message = message;
    this.targets = targets;

    Error.captureStackTrace(this, this.constructor);
  }

}