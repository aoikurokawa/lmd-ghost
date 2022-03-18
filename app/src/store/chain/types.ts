export type ChainAttr = {
  walletAddress?: string;
};

export interface IChainState {
  loading: boolean;
  error: string | null;
  data: ChainAttr;
}

export enum ActionType {
  GET_WALLETADDRESS = "GET_WALLETADDRESS",
}

export type Action = {
  type: ActionType.GET_WALLETADDRESS;
  payload: Required<IChainState>;
};
