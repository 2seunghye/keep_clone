import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../Card";
import styled from "styled-components";
import CardList from "../MemoList/CardList";

const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

const ShowMemoWithLabel = () => {
	const labelText = useParams().labelText;
	const labelState = useSelector((state) => state.labelFetch);
	const MemoState = useSelector((state) => state.memoFetch);

	let labelId = null;
	labelState.forEach((item) => {
		if (item.text === labelText) {
			labelId = item.id;
		}
	});

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

	return (
		<StyledDiv>
			<h5>ShowMemoWithLabel</h5>
			<CardList state={filteredList} />
		</StyledDiv>
	);
};

export default ShowMemoWithLabel;
