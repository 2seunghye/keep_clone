import * as types from "../../types";

export const create_item = (listId, text) => ({
	type: types.CREATE_ITEM,
	listId: listId,
	payload: {
		id: parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join("")),
		text,
		done: false,
	},
});

export const update_item = (listId, payload) => ({
	type: types.UPDATE_ITEM,
	listId: listId,
	payload,
});

export const delete_item = (listId, id) => ({
	type: types.DELETE_ITEM,
	listId: listId,
	payload: {
		id,
	},
});

export const create_label_in_card = (listId, text, id) => ({
	type: types.CREATE_LABEL_IN_CARD,
	listId: listId,
	payload: {
		id,
		text,
	},
});

export const update_label_in_all_card = (payload) => ({
	type: types.UPDATE_LABEL_IN_ALL_CARD,
	payload,
});

export const delete_label_in_card = (listId, id) => ({
	type: types.DELETE_LABEL_IN_CARD,
	listId: listId,
	payload: {
		id,
	},
});

export const delete_label_in_all_card = (id) => ({
	type: types.DELETE_LABEL_IN_ALL_CARD,
	payload: {
		id,
	},
});

export const change_checkbox_status = (listId, id) => ({
	type: types.CHANGE_CHECKBOX_STATUS,
	listId: listId,
	payload: {
		id,
	},
});

export const change_background_color = (listId, payload) => ({
	type: types.CHANGE_BACKGROUND_COLOR,
	listId: listId,
	payload,
});

export const create_check_card = () => ({
	type: types.CREATE_CHECK_CARD,
	id: parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join("")),
});

export const create_text_card = () => ({
	type: types.CREATE_TEXT_CARD,
	id: parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join("")),
});

export const toggle_fixed_status = (listId) => ({
	type: types.TOGGLE_FIXED_STATUS,
	listId: listId,
});
