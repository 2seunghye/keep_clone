import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../Card";

const ShowMemoWithLabel = () => {
	const labelText = useParams().labelText;

	const labelState = useSelector((state) => state.labelFetch);

	let labelId = null;
	labelState.forEach((item) => {
		if (item.text === labelText) {
			labelId = item.id;
		}
	});

	console.log(labelId);

	const MemoState = useSelector((state) => state.memoFetch);

	const filteredList = MemoState.filter((item) => {
		const listLabels = item.listLabels;

		if (listLabels.length) {
			for (let i = 0; i < listLabels.length; ++i) {
				if (listLabels[i].id == labelId) {
					return item;
				}
			}
		}
	});

	console.log(filteredList);

	let cardList = filteredList.map((item, index) => {
		return <Card key={index} item={item} listId={item.listId} />;
	});

	return <div>{cardList}</div>;
};

export default ShowMemoWithLabel;
