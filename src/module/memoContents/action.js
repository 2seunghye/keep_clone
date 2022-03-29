import {createAction} from "@reduxjs/toolkit";

const CREATE = "memo/create";
const READ = "memo/read";
const UPDATE = "memo/update";
const DELETE = "memo/delete";

export const addMemo = createAction(CREATE);
export const updateMemo = createAction(UPDATE);
export const deleteMemo = createAction(DELETE);
export const readMemo = createAction(READ);

const moduleAction = {
	addMemo,
	updateMemo,
	deleteMemo,
	readMemo
};
export default moduleAction;