import { memoState } from "../../data/initialState";
import * as types from "./types";
const memoReducer = (state = memoState, action) => {
	const { type, payload } = action;
	const initializeMemoData = {
		bgColor: "white",
		isFixed: false,
		listId: action.id,
		contents: [],
		labels: [],
	};
	switch (type) {
		case types.CREATE_CHECK_CARD:
			return [...state, { ...initializeMemoData, useCheckbox: true }];
		case types.CREATE_TEXT_CARD:
			return [...state, { ...initializeMemoData, useCheckbox: false }];
		case types.DELETE_CARD:
			return state.filter((arr) => arr.listId !== action.listId);

		case types.COPY_CARD:
			return [
				...state,
				{
					...payload,
					isFixed: false,
					listId: action.id,
				},
			];

		case types.CREATE_ITEM:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						contents: [...arr.contents, payload],
					};
				}
				return arr;
			});

		case types.DELETE_ITEM:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return { ...arr, contents: arr.contents.filter((obj) => obj.id !== payload.id) };
				}
				return arr;
			});

		case types.UPDATE_ITEM:
			console.log(231);
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						contents: arr.contents.map((obj) => (obj.id === payload.id ? payload : obj)),
					};
				}
				return arr;
			});
		case types.CHANGE_CHECKBOX_STATUS:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						contents: arr.contents.map((obj) => (obj.id === payload.id ? { ...obj, isChecked: !obj.isChecked } : obj)),
					};
				}
				return arr;
			});

		case types.CHANGE_BACKGROUND_COLOR:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						bgColor: payload.bgColor,
					};
				}
				return arr;
			});

		case types.CREATE_LABEL_IN_CARD:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						labels: [...arr.labels, payload],
					};
				}
				return arr;
			});

		case types.DELETE_LABEL_IN_CARD:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						labels: arr.labels.filter((obj) => obj.id !== payload.id),
					};
				}
				return arr;
			});

		case types.UPDATE_LABEL_IN_ALL_CARD:
			return state.map((arr) => {
				let flag = false;

				arr.labels.forEach((item) => {
					if (item.id == payload.id) {
						flag = true;
					}
				});

				if (flag) {
					return {
						...arr,
						labels: arr.labels.map((obj) => (obj.id === payload.id ? payload : obj)),
					};
				}
				return arr;
			});

		case types.DELETE_LABEL_IN_ALL_CARD:
			return state.map((arr) => {
				let flag = false;

				arr.labels.forEach((item) => {
					if (item.id == payload.id) {
						flag = true;
					}
				});

				if (flag) {
					return {
						...arr,
						labels: arr.labels.filter((obj) => obj.id !== payload.id),
					};
				}
				return arr;
			});
		case types.TOGGLE_FIXED_STATUS:
			return state.map((arr) => {
				if (arr.listId == action.listId) {
					return {
						...arr,
						isFixed: !arr.isFixed,
					};
				}
				return arr;
			});

		default:
			return state;
	}
};
export default memoReducer;