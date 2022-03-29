import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// called component
import CreateMemoForm from "../UI/CreateMemoForm";
import MemoClassfier from "./MemoClassfier";
import Heading from "../common/Heading";
// styled component
const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;
// component
function MemoList(){
	const {memoState} = useSelector(state => state);
	return (
		<StyledDiv>
			<Heading level={"h1"} headcopy="Memo List" />
			<CreateMemoForm />
			<MemoClassfier memos={memoState} />
		</StyledDiv>
	);
};

export default MemoList;