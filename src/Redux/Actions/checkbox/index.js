import * as types from "../../types";

export const create_item = (index, text) => ({
	type: types.CREATE_ITEM,
	index: index,
	payload: {
		id: parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join("")),
		text,
		done: false,
	},
});

export const update_item = (index, payload) => ({
	type: types.UPDATE_ITEM,
	index: index,
	payload,
});

export const delete_item = (index, id) => ({
	type: types.DELETE_ITEM,
	index: index,
	payload: {
		id,
	},
});

export const create_label_in_card = (index, text, id) => ({
	type: types.CREATE_LABEL_IN_CARD,
	index: index,
	payload: {
		id,
		text,
	},
});

export const update_label_in_card = (index, payload) => ({
	type: types.UPDATE_LABEL_IN_CARD,
	index: index,
	payload,
});

export const delete_label_in_card = (index, id) => ({
	type: types.DELETE_LABEL_IN_CARD,
	index: index,
	payload: {
		id,
	},
});

export const change_checkbox_status = (index, id) => ({
	type: types.CHANGE_CHECKBOX_STATUS,
	index: index,
	payload: {
		id,
	},
});

export const create_check_card = () => ({
	type: types.CREATE_CHECK_CARD,
});

export const create_text_card = () => ({
	type: types.CREATE_TEXT_CARD,
});
