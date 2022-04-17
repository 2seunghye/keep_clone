import { current } from "@reduxjs/toolkit";
// reducer
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

// library:handle data
export const setToList = function(_parameter, [_begin, _end]){
	const array = (()=>{
		return (
			_parameter instanceof Array ? 
			_parameter : 
			Array.prototype.slice.call(arguments)
		)
	})();
	const s = _begin || 0;
	const e = _end || array.length;
	const result = array.slice(s, e);
	return result;
};
export function splitList(_parameter, _break_index){
	const array = (()=>{
		return (
			_parameter instanceof Array ? 
			_parameter : 
			Array.prototype.slice.call(arguments)
		)
	})();
	const break_index = _break_index || Math.round(array.length * 0.5);
	return [
		array.slice(0, break_index),
		array.slice(break_index, array.length)
	]
};
// abstract
export class eventModule{
	constructor(obj){
		this.name = obj.name;
		this.interaction = (_payload, useId, _dispatch = this.dispatch)=>{
			const action = Object.assign(
				{},
				obj.pipe(_payload),
				useId ? 
					{ id : useId } : 
					{}
			) 
			_dispatch(action);
		};
	}
	setDispatch(_dispatch_callback){
		this.dispatch = _dispatch_callback;
		return this;
	}
}
export class UIList{
	constructor(){
		this.list = {};
	}
	registry(..._module){
		_module.reduce((list, one) => {
			list[one.name] = new eventModule(one);
			return list;
		}, this.list);
	}
}