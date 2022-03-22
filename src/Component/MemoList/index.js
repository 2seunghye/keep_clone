import React from "react";
import styled from "styled-components";
import CreateMemoForm from "./CreateMemoForm";
import CardList from "./CardList";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

const MemoList = () => {
	const state = useSelector((state) => state.memoFetch);

	return (
		<StyledDiv>
			<h5>Memo List</h5>
			<CreateMemoForm />
			<CardList state={state} />
		</StyledDiv>
	);
};

export default MemoList;
