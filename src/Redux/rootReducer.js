import { combineReducers } from "redux";
import { memoFetch } from "./Reducers/memo";
import { labelFetch } from "./Reducers/label";

const reducers = combineReducers({
	memoFetch,
	labelFetch,
});

export default reducers;
