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
		console.groupEnd("array:update");
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
		console.groupEnd("object:update");
		return newData;
	},
};

export const addData = {
	byArrayType: (data, action) => {
		console.group("array:add");
		console.log("data :", current(data));
		const { payload } = action;
		console.log("payload :", payload);
		const newData = [...data, payload];
		console.log("newData :", newData);
		console.groupEnd("array:add");
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

// utility
export const nullish = (v) => (v == null);

export function findParent(_el, _target_selector){
	const classfier = 0 < _target_selector.match(/^(\.)/g).length ? "classList" : "id";
	let isMatched = false;
	switch(classfier){
		case "classList" :
			isMatched = 0 <= _el.parentElement[classfier].value.indexOf(_target_selector);
			break;
		case "id" :
			isMatched = 0 <= _el.parentElement[classfier].indexOf(_target_selector);
			break;
		default :
			return false;
	}
	// includes method do not working with IE, 
	// if browser is not ie, use "closest" 
	// const isMatched = _el.parentElement[classfier].includes(_target_selector);	
	if(isMatched) return _el.parentElement;
	return findParent(_el.parentElement);
};

export function hasText(_nodeList){
	const toArray = [..._nodeList];
	const spell_length = toArray.reduce((sum, el, index) =>{
		sum += el.innerText.length;
		return sum;
	}, 0);
	return !!spell_length;
};