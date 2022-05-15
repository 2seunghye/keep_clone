import { createSlice } from "@reduxjs/toolkit";
import { memoContentsState } from "./state";
import {addData, updateData, removeData} from "../../common/utils";
const {actions, reducer : memoContentsReducer } = createSlice({
	name :"memoContents",
	initialState : memoContentsState,
	reducers : {
		createContents: addData.byObjectType,
		updateContents: updateData.byObjectType,
		removeContents: removeData.byObjectType,
		updateSingleContent : (_prev, _action)=>{
			const {memoId : id, type} = _action;
			// find single content
			const target_content = _prev[id];
			// update single content
			const new_content = updateData.byArrayType(target_content, _action);
			// re-pack
			const repackage_action = {
				type, 
				id,
				payload : new_content
			};
			// push to store
			return updateData.byObjectType(_prev, repackage_action);
		},
		removeSingleContent : (_prev, _action)=>{
			const {memoId : id, type} = _action;
			// find single content
			const target_content = _prev[id];
			// update single content
			const new_content = removeData.byArrayType(target_content, _action);
			// re-pack
			const repackage_action = {
				type, 
				id,
				payload : new_content
			};
			// push to store
			return updateData.byObjectType(_prev, repackage_action);
		}
	},
});
export const {createContents, updateContents, removeContents, updateSingleContent, removeSingleContent} = actions;
export const selectContents = (state) => state.memoContents;
export const selectContentsById = (keyName) => (state) => (state.memoContents[keyName]);
export default memoContentsReducer;