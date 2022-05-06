import { combineReducers } from "redux";
import memoReducer from "../module/memo";
import labelReducer from "../module/label";
import memoContentsReducer from "../module/memoContents";
import popupReducer from "../module/popup";
import appReducer from "../module/app";
import newMemoReducer from "../module/newMemo";

export const rootReducer = combineReducers({
	app : appReducer,
	newMemo : newMemoReducer,
	memos: memoReducer,
	memoContents: memoContentsReducer,
	label: labelReducer,
	popup : popupReducer,
});

export default rootReducer;