import * as types from "./types";

export const create_label = (text, id) => ({
	type: types.CREATE_LABEL,
	payload: {
		id,
		text,
	},
});

export const update_label = (payload) => ({
	type: types.UPDATE_LABEL,
	payload,
});

export const delete_label = (id) => ({
	type: types.DELETE_LABEL,
	payload: {
		id,
	},
});
