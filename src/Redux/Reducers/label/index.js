import * as types from "../../types";

export const initial_state = [
	{
		id: 1,
		text: "Label1",
	},
];

export const labelFetch = (state = initial_state, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.CREATE_LABEL:
			return [...state, payload];
		case types.UPDATE_LABEL:
			return state.map((obj) => {
				if (obj.id === payload.id) return payload;
				return obj;
			});
		case types.DELETE_LABEL:
			return state.filter((obj) => {
				console.log(obj);
				return obj.id !== payload.id;
			});
		default:
			return state;
	}
};
