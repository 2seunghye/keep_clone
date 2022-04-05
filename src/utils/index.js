// utility function
export const updateData = {
	byArrayType : 
	(data, payload)=>{
		const newData = data.map(dataset => {
			if(dataset.id !== payload.id) 
				return dataset;
			if(payload?.sliceCallback) 
				return payload.sliceCallback(dataset);
			// default
			return payload;
		});
		return newData;
	},
	byObjectType :
	(data, payload)=>{
		const newData = Object.assign({}, data, payload);
		return newData;
	},
};
export const addData = {
	byArrayType :
	(data, payload)=>{
		const newData = [
			...data,
			payload
		]
		return newData;
	},
	byObjectType : updateData.byObjectType
};
export const removeData = {
	byArrayType :
	(data, payload)=>{
		const newData = data.filter(dataset => dataset.id !== payload.id);
		return newData;
	},
	byObjectType :
	(data, payload)=>{
		const newData = {...data};
		delete newData[payload.id]; 
		return newData;
	}
};