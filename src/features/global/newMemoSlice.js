import { createSlice, nanoid } from "@reduxjs/toolkit";
export const newMemoSlice = createSlice({
	name : "newMemo",
	initialState : {
		id : "temporary",
		bgColor: "#fff",
		isFixed : null,
		isKeep : null,
		useCheckbox: false,
		title : "",
		labels : [],
		contents : [
			{
				id : nanoid(),
				text : "",
				isChecked : false
			}
		],
	},
	reducers : {
		updateNewMemo : (_prev, _action)=>{
			const {payload} = _action;
			const newState = Object.assign(
				{},
				_prev,
				payload
			);
			return newState;
		},
		updateEditorStatus : (_prev, _action)=>{
			const {payload} = _action;
			const newState = {..._prev};
			newState.textIsEmpty = Object.assign(
				{},
				newState.textIsEmpty,
				payload
			);
			return newState;
		},
		refreshNewMemo : (_prev, _action)=>{
			const newState = newMemoSlice.getInitialState(); 
			return newState;
		}
	}
});
const {actions, reducer : newMemoReducer} = newMemoSlice;
export const {updateNewMemo, refreshNewMemo, updateEditorStatus} = actions;
export const selectNewMemo = (state)=>state.newMemo;
export const selectNewMemoContents = (state)=>state.newMemo.contents;
export const selectEditorTextStatus = (_id)=>(state)=>state.newMemo.textIsEmpty[_id];
export default newMemoReducer;