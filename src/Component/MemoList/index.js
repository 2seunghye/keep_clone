import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// module
import { selectMemo } from "../../module/memo";
// component:called 
import Heading from "../common/Heading";
import MemoClassfier from "./MemoClassfier";
// component:styled
const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;
// component
function MemoList(){
	const memos = useSelector(selectMemo);
	return (
		<StyledDiv>
			<Heading level={"h1"} headcopy="Memo List" />
			<MemoClassfier memos={memos} />
		</StyledDiv>
	);
};

export default MemoList;