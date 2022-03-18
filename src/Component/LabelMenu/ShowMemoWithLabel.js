import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const ShowMemoWithLabel = ({ activeId }) => {
	const MemoState = useSelector((state) => state.memoFetch);

	const filteredList = MemoState.filter((item) => {
		const listLabels = item.listLabels;

		if (listLabels.length) {
			for (let i = 0; i < listLabels.length; ++i) {
				if (listLabels[i].id == activeId) {
					return item;
				}
			}
		}
	});

	let cardList = filteredList.map((item, index) => {
		return <Card key={index} item={item} index={index} />;
	});

	return <div>{cardList}</div>;
};

export default ShowMemoWithLabel;
