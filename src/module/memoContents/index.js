import {memoState, contentsState} from "../../data/initialState";
const CREATE = "memo/create";
const READ = "memo/read";
const UPDATE = "memo/update";
const DELETE = "memo/DELETE";

// utility function
const updateData = {
	byArrayType : 
	(data, payload)=>{
		const newData = data.map(dataset => {
			if(dataset.id === payload.id) 
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
		const newData = Object.assign(data, payload);
		return newData;
	},
};
const addData = {
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
const removeData = {
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

// reducer
function memoReducer(prevState = memoState, action){
	const {type, payload} = action;
	switch(type){
		case CREATE :
			return addData.byArrayType(prevState, payload);
		case UPDATE :
			return updateData.byArrayType(prevState, payload);
		case DELETE :
			return removeData.byArrayType(prevState, payload);
		case READ :
		default :
			return prevState;
	}
}

function memoContentsReducer(prevState = contentsState , action){
	const {type, payload} = action;
	switch(type){
		case "memo/contents/update" :
			payload.action = "update";
			return memoReducer(prevState, payload);
		default :
			return prevState;
	}
}

export default memoContentsReducer;