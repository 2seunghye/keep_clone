// utility function
export const updateData = {
	byArrayType: (data, action) => {
		console.log(123);
		const { payload } = action;
		const newData = data.map((dataset) => {
			if (dataset.id !== payload.id) return dataset;
			if (payload?.sliceCallback) return payload.sliceCallback(dataset);
			// default
			return payload;
		});
		console.group("dsa");
		console.log("data :", data);
		console.log("newData :", newData);
		console.log("payload :", payload);
		console.groupEnd("dsa");
		return newData;
	},
	byObjectType: (data, action) => {
		const { payload } = action;
		const newData = Object.assign({}, data, payload);
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
		delete newData[payload.id];
		return newData;
	},
};
