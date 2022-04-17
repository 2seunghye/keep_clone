import { createSlice } from "@reduxjs/toolkit";
import { updateData } from "../../utils";

const {actions, reducer : popupReducer} = createSlice({
	name : "popup",
	initialState : {
		// Format
		// [keyname] : {
		// 	isCalled : false,
		// },
		"나에게 알림" : {
			isCalled : false
		},
		"공동 작업자" : {
			isCalled : false
		},
		"배경 옵션" : {
			isCalled : false,
		},
		"더보기" : {
			isCalled : false
		},
		"라벨" : {
			isCalled : false
		},
	},
	reducers : {
		callPopup : updateData.byObjectType,
		closePopup : updateData.byObjectType
	}
});

export const {callPopup, closePopup} = actions;
export const selectPopup = (_keyname) => (state) => state.popup;
export const selectPopupByKeyname = (_keyname) => (state) => state.popup[_keyname];
export default popupReducer;