import { combineReducers } from "redux";
import { memoSlice } from "../module/memo";
import { labelSlice } from "../module/label";
import { contentsSlice } from "../module/memoContents";

export const rootReducer = combineReducers({
	memos: memoSlice.reducer,
	memoContents: contentsSlice.reducer,
	label: labelSlice.reducer,
});

export default rootReducer;
