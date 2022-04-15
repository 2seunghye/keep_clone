import { labelState } from "../../data/initialState";
import * as types from "./types";
import { addData, updateData, removeData } from "../../utils";
import { createSlice } from "@reduxjs/toolkit";

export const labelSlice = createSlice({
	name: "label",
	initialState: labelState,
	reducers: {
		createLabel: addData.byArrayType,
		updateLabel: updateData.byArrayType,
		deleteLabel: removeData.byArrayType,
	},
});
export const { getMemoGroup, createLabel, updateLabel, deleteLabel } = labelSlice.actions;
export const selectLabel = (state) => state.label;
export default labelSlice.reducer;
console.log("labelSlice :", labelSlice.getInitialState());
