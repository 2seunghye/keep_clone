import { addData, updateData, removeData } from "../../common/utils";
import { createSlice } from "@reduxjs/toolkit";

export const labelSlice = createSlice({
	name: "label",
	initialState: [
		// data format
		{
			id : "default",
			text : "test",
			memoGroup : [
				"memo-1"
			]
		}
	],
	reducers: {
		createLabel: addData.byArrayType,
		updateLabel: updateData.byArrayType,
		deleteLabel: removeData.byArrayType,
	},
});

const {actions, reducer : labelReducer} = labelSlice;
export const { getMemoGroup, createLabel, updateLabel, deleteLabel } = actions;
export const selectLabels = (state) => state.labels;
export const selectLabel = (param) => (state) => state.labels.filter((label) => label.text === param)[0];
export default labelReducer;