import React from "react";
import {Route, Routes} from "react-router-dom";
// component:called
import MemoCreator from "../Component/MemoList/MemoCreator";
import MemoList from "../Component/MemoList";
import { useSelector } from "react-redux";
import { selectNewMemo } from "../module/newMemo";

function Memo(props){
	return(
		<div>Card</div>
	);
};
const HomeView = () => {
	return (
		<>
			{/* new memo creator */}
			{/* <MemoCreator /> */}
			{/* memo list */}
			<MemoList />
		</>
	);
};

export default HomeView;
