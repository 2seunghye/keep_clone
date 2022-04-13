import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import MemoCard from "../Component/Card";
import MemoList from "../Component/MemoList";

const HomeView = () => {
	const initial_memo_format = {
		id : nanoid(),
		bgColor: "#fff",
		isActive : true,
		isFixed : null,
		useCheckbox: null,
		labels : []
	}
	return (
		<>
			{/* new memo creator */}
			<MemoCard memo={initial_memo_format} />
			{/* memo list */}
			<MemoList />
		</>
	);
};

export default HomeView;
