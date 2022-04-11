import { labelState } from "../../data/initialState";
import * as types from "./types";
import { addData, updateData, removeData } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";
// function update_object(_prev, _new){
// 	return Object.assign({}, _prev, _new);
// };
// function update_array(_array, _id, _callback){
// 	const target = _array.map(item => {
// 		if(item.id !== _id) return item;
// 		const target_item = _callback(item);
// 		return target_item;
// 	});
// 	return target;
// }

export const labelSlice = createSlice({
	name: "labels",
	initialState: labelState,
	reducers: {
		createLabel: addData.byArrayType,
		updateLabel: updateData.byArrayType,
		deleteLabel: removeData.byArrayType,
	},
});
export const { createLabel, updateLabel, deleteLabel } = labelSlice.actions;
export const selectLabel = (state) => state.memos;
export default labelSlice.reducer;
console.log("labelSlice :", labelSlice.getInitialState());

// const labelReducer = (state = labelState, action) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 		case types.CREATE_LABEL:
// 			return addData.byArrayType(state, payload);
// 		case types.UPDATE_LABEL:
// 			return updateData.byArrayType(state, payload);
// 		case types.DELETE_LABEL:
// 			return removeData.byArrayType(state, payload);
// 		default:
// 			return state;
// 	}
// };

// export default labelReducer;
