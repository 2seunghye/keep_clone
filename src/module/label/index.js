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
			// 이 reducer가 조회용이라면 set 함수는 없어야 함.
			// set 함수가 있다면 update label을 이용해야 함.
			// 조회용이 필요하다면 하단의 selectLabel을 사용하면 됨.
			// memoState 안의 labels를 대상으로 한다면 문의할 것. 
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
