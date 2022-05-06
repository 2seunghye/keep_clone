export const memoState = [
	{
		id: "memo-1",
		bgColor: "#fff",
		title: "상현",
		isActive: false,
		isFixed: true,
		isKeep: false,
		useCheckbox: true,
		labels: [],
	},
	{
		id: "memo-2",
		bgColor: "#fff",
		title: "상현",
		isActive: false,
		isFixed: false,
		isKeep: false,
		useCheckbox: false,
		labels: [
			"label-1",
			"label-2",
		],
	},
];
export const contentsState = {
	"memo-1": [
		{
			id: "contents-1",
			text: "Donec porta augue purus",
			isChecked: true,
		},
		{
			id: "contents-2",
			text: "Lorem ipsum dolor sit amet",
			isChecked: true,
		},
		{
			id: "contents-3",
			text: "mi vehicula tortor",
			isChecked: false,
		},
	],
	"memo-2": [
		{
			id: "contents-01",
			text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
		},
	],
};
export const labelState = [
	// data format
];