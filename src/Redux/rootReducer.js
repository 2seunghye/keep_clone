import { combineReducers } from "redux";
import { memoSlice } from "../module/memo";
import { labelSlice } from "../module/label";

export const rootReducer = combineReducers({
	memos: memoSlice.reducer,
	labels: labelSlice.reducer,
});

export default rootReducer;
