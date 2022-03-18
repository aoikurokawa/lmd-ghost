import { IChainState, Action, ActionType } from "./types";

const initialState: IChainState = {
  loading: false,
  error: null,
  data: {},
};

export const chainReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_WALLETADDRESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    default:
      return state;
  }
};
