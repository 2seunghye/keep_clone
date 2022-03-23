import React, { useState } from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import BackgroundColorBox from "./BackgroundColorBox";

const StyledDiv = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item }) => {
	return (
		<StyledDiv color={item.bgColor}>
			<h5>Card</h5>
			<BackgroundColorBox listId={item.listId} bgColor={item.bgColor} />
			<FixedButton listId={item.listId} isFixed={item.isFixed} />
			<MemoInput listId={item.listId} />
			<List listId={item.listId} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
