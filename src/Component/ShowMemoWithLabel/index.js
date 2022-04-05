import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MemoClassfier from "../MemoList/MemoClassfier";

// styled component
const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

function ShowMemoWithLabel(){
	const {memoState, labelState} = useSelector((state) => state);
	const labelText = useParams().labelText;
	const selectedLabel = labelState.filter(label => label.text === labelText)[0];
	const filteredMemoState = selectedLabel.memoGroup.reduce((newList, memoId) => {
		const pick = memoState.filter( memo => memo.listId === memoId )[0];
		newList.push(pick);
		return newList;
	}, []);
	return (
		<StyledDiv>
			<MemoClassfier state={filteredMemoState} />
		</StyledDiv>
	);
};

export default ShowMemoWithLabel;
