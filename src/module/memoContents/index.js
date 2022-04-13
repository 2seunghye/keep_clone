import { createSlice, current } from "@reduxjs/toolkit";
import { contentsState } from "../../data/initialState";
import {addData, updateData, removeData} from "../../utils";
export const contentsSlice = createSlice({
	name :"memoContents",
	initialState : contentsState,
	reducers : {
		createContents: addData.byObjectType,
		updateContents: updateData.byObjectType,
		removeContents: removeData.byObjectType,
		updateSingleContent : (_prev, _action)=>{
			const {memoId : id, type} = _action;
			const target_content = _prev[id];
			const new_content = updateData.byArrayType(target_content, {..._action, id});
			const repackage_action = {
				id,
				type, 
				payload : new_content
			};
			return updateData.byObjectType(_prev, repackage_action);
		}
	},
});
export const {createContents, updateContents, removeContents, updateSingleContent} = contentsSlice.actions;
export const selectContents = (state) => state.memoContents;
export const selectContentsById = (keyName) => (state) => (state.memoContents[keyName]);
export default contentsSlice.reducer;