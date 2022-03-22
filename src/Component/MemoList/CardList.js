import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const CardList = () => {
	const state = useSelector((state) => state.memoFetch);

	let cardList = state.map((item, index) => {
		console.log(item.isFixed);
		if (!item.isFixed && item.isFixed !== undefined) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	let fixedCardList = state.map((item, index) => {
		console.log(item.isFixed);

		if (item.isFixed && item.isFixed !== undefined) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	return (
		<>
			<div>
				<h5>고정됨</h5>
				{fixedCardList}
			</div>
			<div>
				<h5>기타</h5>
				{cardList}
			</div>
		</>
	);
};

export default CardList;
