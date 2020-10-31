export interface IServiceOutputData<TSuccessData, TErrorData> {
  success?: {
    data: TSuccessData,
    targetPlayers?: string[],
  };
  error?: {
    data: TErrorData,
    targetPlayers?: string[],
  };
}