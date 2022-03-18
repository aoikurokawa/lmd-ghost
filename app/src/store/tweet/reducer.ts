import { ITweetState, Action, ActionType } from "./types";

const initialState: ITweetState = {
  loading: false,
  error: null,
  data: {},
};

export const chainReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_ALL_TWEETS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    default:
      return state;
  }
};
