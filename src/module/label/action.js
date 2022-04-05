import * as action from "./types";

export const create_label = (text, id, memoId) => ({
	type: action.CREATE_LABEL,
	payload: {
		id,
		text,
		callback : (_prev)=>{
			return [..._prev.memoGroup, memoId];
		}
	}
});

export const update_label = (payload) => ({
	type: action.UPDATE_LABEL,
	payload,
});

export const delete_label = (id) => ({
	type: action.DELETE_LABEL,
	payload: {
		id,
	},
});
