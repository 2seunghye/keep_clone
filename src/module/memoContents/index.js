import {memoState, contentsState} from "../../data/initialState";
import {addData, updateData, removeData} from "../../utils";
const CREATE = "memo/contents/create";
const READ = "memo/contents/read";
const UPDATE = "memo/contents/update";
const DELETE = "memo/contents/delete";
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