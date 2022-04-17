import { createSlice } from "@reduxjs/toolkit";
import { memoState } from "../../data/initialState";
import { addData, updateData, removeData } from "../../utils";

const {actions, reducer : memoReducer } = createSlice({
	name: "memos",
	initialState: memoState,
	reducers: {
		createMemo: addData.byArrayType,
		copyMemo: addData.byArrayType,
		updateMemo: updateData.byArrayType,
		deleteMemo: removeData.byArrayType,
		removeMemoLabel : (_prev, _action)=>{
			const {memoId : id, payload} = _action;
			const target_memo = _prev.filter(memo => id === memo.id)[0];
			const new_memo = {
				...target_memo,
				labels : payload
			};
			return updateData.byArrayType(_prev, new_memo);
		}
	},
});
export const { createMemo, updateMemo, deleteMemo, copyMemo, removeMemoLabel } = actions;
export const selectMemos = (state) => state.memos;
export const selectMemoById = (id) => (state) => state.memos.filter(memo => memo.id === id)[0];
export default memoReducer;
