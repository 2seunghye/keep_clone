import * as types from "../../types";

export const initial_state = [
	{
		listId: 1,
		listType: "checkbox",
		listItems: [
			{
				id: 1,
				text: "Donec porta augue purus",
				isChecked: true,
			},
			{
				id: 2,
				text: "Lorem ipsum dolor sit amet",
				isChecked: true,
			},
			{
				id: 3,
				text: "mi vehicula tortor",
				isChecked: false,
			},
		],
		listLabels: [],
	},
	{
		listId: 2,
		listType: "text",
		listItems: [
			{
				id: 5,
				text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			},
		],
		listLabels: [],
	},
];

export const memoFetch = (state = initial_state, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.CREATE_CHECK_CARD:
			return [
				...state,
				{
					listId: action.id,
					listType: "checkbox",
					listItems: [],
					listLabels: [],
				},
			];

		case types.CREATE_TEXT_CARD:
			return [
				...state,
				{
					listId: action.id,
					listType: "text",
					listItems: [],
					listLabels: [],
				},
			];

		case types.CREATE_ITEM:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						listItems: [...arr.listItems, payload],
					};
				}
				return arr;
			});

		case types.DELETE_ITEM:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return { ...arr, listItems: arr.listItems.filter((obj) => obj.id !== payload.id), listLabels: arr.listLabels };
				}
				return arr;
			});

		case types.UPDATE_ITEM:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						listItems: arr.listItems.map((obj) => (obj.id === payload.id ? payload : obj)),
					};
				}
				return arr;
			});
		case types.CHANGE_CHECKBOX_STATUS:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						listItems: arr.listItems.map((obj) => (obj.id === payload.id ? { ...obj, isChecked: !obj.isChecked } : obj)),
					};
				}
				return arr;
			});

		case types.CREATE_LABEL_IN_CARD:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						listLabels: [...arr.listLabels, payload],
					};
				}
				return arr;
			});

		case types.DELETE_LABEL_IN_CARD:
			return state.map((arr) => {
				if (arr.listId === action.listId) {
					return {
						...arr,
						listLabels: arr.listLabels.filter((obj) => obj.id !== payload.id),
					};
				}
				return arr;
			});

		case types.UPDATE_LABEL_IN_ALL_CARD:
			return state.map((arr) => {
				let flag = false;

				arr.listLabels.forEach((item) => {
					if (item.id == payload.id) {
						flag = true;
					}
				});

				if (flag) {
					return {
						...arr,
						listLabels: arr.listLabels.map((obj) => (obj.id === payload.id ? payload : obj)),
					};
				}
				return arr;
			});

		case types.DELETE_LABEL_IN_ALL_CARD:
			return state.map((arr) => {
				let flag = false;

				arr.listLabels.forEach((item) => {
					if (item.id == payload.id) {
						flag = true;
					}
				});

				if (flag) {
					return {
						...arr,
						listLabels: arr.listLabels.filter((obj) => obj.id !== payload.id),
					};
				}
				return arr;
			});

		default:
			return state;
	}
};
