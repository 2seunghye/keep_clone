import { combineReducers } from "redux";
import memoReducer from "../module/memo";
import labelReducer from "../module/label";

const rootReducer = combineReducers({
	memoState : memoReducer,
	labelState : labelReducer,
});

export default rootReducer;