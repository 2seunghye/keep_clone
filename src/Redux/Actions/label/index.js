import * as types from "../../types";

export const create_label = (text) => ({
	type: types.CREATE_LABEL,
	payload: {
		id: parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join("")),
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
