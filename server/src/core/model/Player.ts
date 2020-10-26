export class Player {

  private readonly id: string;

  private readonly nickname: string;

  private rating: number;

  constructor(nickname: string, rating?: number) {
    this.id = 'TODO: uuid v4';
    this.nickname = nickname;
    this.rating = rating || 0;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public getRating(): number {
    return this.rating;
  }

  public rate(): void {
    this.rating += 1;
  }

}