import React from "react";
import styled from "styled-components";
import CreateMemoForm from "../UI/CreateMemoForm";
import CardListWrap from "./CardListWrap";
import { useSelector } from "react-redux";
import Heading from "../common/Heading";

const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

const MemoList = () => {
	const state = useSelector((state) => state.memoFetch);

	return (
		<StyledDiv>
			<Heading level={"h1"} headcopy="Memo List" />
			<CreateMemoForm />
			<CardListWrap state={state} />
		</StyledDiv>
	);
};

export default MemoList;
