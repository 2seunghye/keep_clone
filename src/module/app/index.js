import { createSlice } from "@reduxjs/toolkit";
import { appState } from "../../data/initialState";

const {actions, reducer : appReducer} = createSlice({
	name : "app",
	initialState : appState,
	reducers : {
		floatingPopup : (_prev, _action)=>{
			const newState = {..._prev};
			newState.popup = _action.payload;
			console.log(48953, newState);
			return newState;
		}
	}
});

export const {floatingPopup} = actions;
export default appReducer;