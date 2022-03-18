import * as types from "../../types";

export const initial_state = [
	{
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
			{
				id: 4,
				text: "test",
				isChecked: false,
			},
		],
	},
	{
		listType: "text",
		listItems: [
			{
				id: 5,
				text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			},
		],
	},
];

export const checkboxFetch = (state = initial_state, action) => {
	const { type, payload } = action;
	switch (type) {
		case types.CREATE_CHECK_CARD:
			console.log("create_card");
			return [
				...state,
				{
					listType: "checkbox",
					listItems: [],
				},
			];

		case types.CREATE_TEXT_CARD:
			console.log("create_card");
			return [
				...state,
				{
					listType: "text",
					listItems: [],
				},
			];

		case types.CREATE_ITEM:
			return state.map((arr, index) => {
				console.log(arr);
				if (index === action.index) {
					return {
						listType: arr.listType,
						listItems: [...arr.listItems, payload],
					};
				}
				return arr;
			});

		case types.DELETE_ITEM:
			return state.map((arr, index) => {
				console.log(arr);
				if (index === action.index) {
					return { listType: arr.listType, listItems: arr.listItems.filter((obj) => obj.id !== payload.id) };
				}
				return arr;
			});

		case types.UPDATE_ITEM:
			console.log("change_");

			return state.map((arr, index) => {
				if (index === action.index) {
					return {
						listType: arr.listType,
						listItems: arr.listItems.map((obj) => (obj.id === payload.id ? payload : obj)),
					};
				}
				return arr;
			});
		case types.CHANGE_CHECKBOX_STATUS:
			console.log(action.index, action.payload.id);
			return state.map((arr, index) => {
				if (index === action.index) {
					return {
						listType: arr.listType,
						listItems: arr.listItems.map((obj) => (obj.id === payload.id ? { ...obj, isChecked: !obj.isChecked } : obj)),
					};
				}
				return arr;
			});

		default:
			return state;
	}
};
