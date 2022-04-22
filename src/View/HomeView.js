import React from "react";
// component:called
import MemoCreator from "../Component/MemoList/MemoCreator";
import MemoList from "../Component/MemoList";
import { useSelector } from "react-redux";
import { selectNewMemo } from "../module/newMemo";

const HomeView = () => {
	return (
		<>
			{/* new memo creator */}
			<MemoCreator />
			{/* memo list */}
			<MemoList />
		</>
	);
};

export default HomeView;
