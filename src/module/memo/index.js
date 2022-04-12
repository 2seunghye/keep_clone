import { createSlice } from "@reduxjs/toolkit";
import { memoState } from "../../data/initialState";
import { addData, updateData, removeData } from "../../utils";
export const memoSlice = createSlice({
	name: "memos",
	initialState: memoState,
	reducers: {
		createMemo: addData.byArrayType,
		copyMemo: addData.byArrayType,
		updateMemo: updateData.byArrayType,
		deleteMemo: removeData.byArrayType,
	},
});
export const { createMemo, updateMemo, deleteMemo, copyMemo } = memoSlice.actions;
export const selectMemo = (state) => state.memos;
export default memoSlice.reducer;