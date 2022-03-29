import { labelState } from "../../data/initialState";
import * as types from "./types";

const labelReducer = (state = labelState, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.CREATE_LABEL:
			return [...state, payload];
		case types.UPDATE_LABEL:
			return state.map((obj) => {
				if (obj.id == payload.id) return payload;
				return obj;
			});
		case types.DELETE_LABEL:
			return state.filter((obj) => {
				return obj.id !== payload.id;
			});
		default:
			return state;
	}
};

export default labelReducer;