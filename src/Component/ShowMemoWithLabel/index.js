import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { selectLabel } from "../../module/label";
import { selectMemos } from "../../module/memo";
import MemoClassfier from "../MemoList/MemoClassfier";

// styled component
const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

function ShowMemoWithLabel() {
	const labels = useSelector(selectLabel);
	const memos = useSelector(selectMemos);

	const labelText = useParams().labelText;
	const selectedLabel = labels.filter((label) => label.text === labelText)[0];
	const filteredMemos = selectedLabel.memoGroup.reduce((newList, memoId) => {
		const pick = memos.filter((memo) => memo.listId === memoId)[0];
		newList.push(pick);
		return newList;
	}, []);
	return (
		<StyledDiv>
			<MemoClassfier state={filteredMemos} />
		</StyledDiv>
	);
}

export default ShowMemoWithLabel;
