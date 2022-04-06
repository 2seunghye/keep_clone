import { createSlice } from "@reduxjs/toolkit";
import { memoState } from "../../data/initialState";
import { addData, updateData, removeData } from "../../utils";
export const memoSlice = createSlice({
	name : "memos",
	initialState : memoState,
	reducers : {
		createMemo : (data, action)=>{
			console.log(1231, data.memos);
			return action.payload
		},
		updateMemo : (_prev, _action)=>{
			updateData.byArrayType(_prev, _action.payload);
		},
		deleteMemo : (_prev, _action)=>{
			removeData.byArrayType(_prev, _action.payload);
		},
		copyMemo : (_prev, _action)=>{
			addData.byArrayType(_prev, _action.payload);
		}
	}
}); 
export const {createMemo, updateMemo, deleteMemo, copyMemo} = memoSlice.actions;
export const selectMemo = (state) => state.memos;
export default memoSlice.reducer;