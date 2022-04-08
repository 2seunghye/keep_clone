import { combineReducers } from "redux";
import memoReducer, { memoSlice } from "../module/memo";
import labelReducer, { labelSlice } from "../module/label";

export const rootReducer = combineReducers({
	memos: memoSlice.reducer,
	labels: labelSlice.reducer,
});

export default rootReducer;
