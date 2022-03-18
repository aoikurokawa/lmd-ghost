import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { chainReducer } from "./chain/reducer";
import { IChainState } from "./chain/types";

export interface IRootState {
    chain: IChainState;
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        chain: chainReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;
