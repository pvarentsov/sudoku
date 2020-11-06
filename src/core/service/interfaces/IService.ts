export interface IService<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}