import { current } from "@reduxjs/toolkit";

// utility function
export const updateData = {
	byArrayType: (data, action) => {
		const { payload } = action;
		const newData = data.map((dataset) => {
			if (dataset.id !== payload.id) return dataset;
			if (payload?.sliceCallback) return payload.sliceCallback(dataset);
			// default
			return payload;
		});
		console.group("array:update");
		console.log("data :", current(data));
		console.log("newData :", newData);
		console.log("payload :", payload);
		console.groupEnd("array");
		return newData;
	},
	byObjectType: (data, action) => {
		const { payload, id } = action;
		const newData = {
			...data,
			[id] : payload
		};
		console.group("object:object");
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
		const { payload } = action;
		const newData = { ...data };
		delete newData[payload.keyName];
		return newData;
	},
};
