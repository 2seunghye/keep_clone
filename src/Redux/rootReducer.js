import { combineReducers } from "redux";
import { checkboxFetch } from "./Reducers/checkbox";
import { labelFetch } from "./Reducers/label";

const reducers = combineReducers({
	checkboxFetch,
	labelFetch,
});

export default reducers;
