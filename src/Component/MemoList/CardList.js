import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const CardList = () => {
	const state = useSelector((state) => state.memoFetch);

	let cardList = state.map((item, index) => {
		return <Card key={index} item={item} index={index} />;
	});
	return <>{cardList}</>;
};

export default CardList;
