import { combineReducers } from "redux";
import memoReducer from "../features/memo/memoSlice";
import memoContentsReducer from "../features/memo/memoContentsSlice";
import labelReducer from "../features/label/labelSlice";

import popupReducer from "../features/popup/popupSlice";
import appReducer from "../features/global/appSlice";
import newMemoReducer from "../features/global/newMemoSlice";

export const rootReducer = combineReducers({
	// app data
	app : appReducer,
	newMemo : newMemoReducer,
	popup : popupReducer,
	// floor data
	memos: memoReducer,
	memoContents: memoContentsReducer,
	labels: labelReducer,
});

export default rootReducer;