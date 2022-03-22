import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../Card";
import styled from "styled-components";

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

	let otherCardList = filteredList.map((item, index) => {
		if (!item.isFixed) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	let fixedCardList = filteredList.map((item, index) => {
		if (item.isFixed) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	return (
		<StyledDiv>
			<h5>ShowMemoWithLabel</h5>
			<div>
				<h5>고정됨</h5>
				{fixedCardList}
			</div>
			<div>
				<h5>기타</h5>
				{otherCardList}
			</div>
		</StyledDiv>
	);
};

export default ShowMemoWithLabel;
