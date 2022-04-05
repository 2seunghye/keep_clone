import { combineReducers } from "redux";
import memoReducer from "../module/memo";
import labelReducer from "../module/label";
const rootReducer = combineReducers({
	memos : memoReducer,
	labelState : labelReducer,
});

export default rootReducer;