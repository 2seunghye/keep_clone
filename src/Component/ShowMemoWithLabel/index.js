import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardListWarp from "../MemoList/CardListWrap";

// styled component
const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

function ShowMemoWithLabel() {
	const labelState = useSelector((state) => state.labelFetch);
	const memoState = useSelector((state) => state.memoFetch);
	const labelText = useParams().labelText;
	// const filteredList = MemoState.filter((item) => {
	// 	const labels = item.labels;

	// 	if (labels.length) {
	// 		for (let i = 0; i < labels.length; ++i) {
	// 			if (labels[i].id === labelId) {
	// 				return item;
	// 			}
	// 		}
	// 	}
	// });
	const targetLabel = labelState.filter((label) => label.text === labelText)[0];

	console.log(targetLabel);
	const filteredList = targetLabel.memoGroup.reduce((newList, memoId, index) => {
		newList.push(memoState.filter((memo) => memo.listId === memoId)[0]);
		return newList;
	}, []);

	return (
		<StyledDiv>
			<CardListWarp state={filteredList} />
		</StyledDiv>
	);
}

export default ShowMemoWithLabel;
