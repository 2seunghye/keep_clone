import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
	name : "app",
	initialState : {
		popup : {
			activeId : null,
			calleeId : null,
			memoId : null
		},
		config : {
			announceTimeDefault : [
				// 오전
				8,
				// 오후
				13,
				// 저녁
				18
			],
			useWriteTogether : false,
			useDarkTheme : false,
			useOpenGraph : true,
			oldMemoFirst : false,
			checkListFirst : false,
		},
	},
	reducers : {
		activatePopup : (_prev, _action)=>{
			const newState = {..._prev};
			newState.popup = _action.payload;
			return newState;
		},
		deactivatePopup : (_prev, _action)=>{
			const newState = {..._prev};
			newState.popup = _action.payload;
			return newState;
		},
	}
});

const {actions, reducer : appReducer} = appSlice;
export const {activatePopup, deactivatePopup} = actions;
export default appReducer;