import { labelState } from "../../data/initialState";
import * as types from "./types";
import { addData, updateData, removeData } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";

export const labelSlice = createSlice({
	name: "labels",
	initialState: labelState,
	reducers: {
		createLabel: addData.byArrayType,
		updateLabel: updateData.byArrayType,
		deleteLabel: removeData.byArrayType,
		getMemoGroup: function (state, action) {
			const { id, setMemoLabels } = action.payload;

			let memoLabel = [];
			state.forEach((item) => {
				item.memoGroup.forEach((listId) => {
					if (id == listId) memoLabel.push(item.text);
				});
			});
			setMemoLabels(memoLabel);
		},
	},
});
export const { getMemoGroup, createLabel, updateLabel, deleteLabel } = labelSlice.actions;
export const selectLabel = (state) => state.labels;
export default labelSlice.reducer;
console.log("labelSlice :", labelSlice.getInitialState());
