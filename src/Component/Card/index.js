import React from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item }) => {
	console.log(item);
	return (
		<StyledDiv>
			<h5>Card</h5>
			<MemoInput listId={item.listId} />
			<List listId={item.listId} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
