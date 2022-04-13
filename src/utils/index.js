import { current } from "@reduxjs/toolkit";

// utility function
export const updateData = {
	byArrayType: (data, action) => {
		console.group("array:update");
		console.log("data :", current(data));
		const { payload } = action;
		console.log("payload :", payload);
		const newData = data.map((dataset) => {
			if (dataset.id !== payload.id) return dataset;
			if (action?.sliceCallback) return action.sliceCallback(dataset);
			// default
			return payload;
		});
		console.log("newData :", newData);
		console.groupEnd("array");
		return newData;
	},
	byObjectType: (data, action) => {
		const { payload, id : keyName } = action;
		const newData = {
			...data,
			[keyName] : payload
		};
		console.group("object:update");
		console.log("data :", current(data));
		console.log("newData :", newData);
		console.log("payload :", payload);
		console.groupEnd("object");
		return newData;
	},
};
export const addData = {
	byArrayType: (data, action) => {
		const { payload } = action;
		const newData = [...data, payload];
		return newData;
	},
	byObjectType: updateData.byObjectType,
};
export const removeData = {
	byArrayType: (data, action) => {
		const { payload } = action;
		const newData = data.filter((dataset) => dataset.id !== payload.id);
		return newData;
	},
	byObjectType: (data, action) => {
		const {id : keyName} = action;
		const newData = { ...data };
		delete newData[keyName];
		return newData;
	},
};
