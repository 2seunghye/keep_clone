import React, { useState } from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import BackgroundColorBox from "./BackgroundColorBox";
import { useDispatch } from "react-redux";
import { delete_card } from "../../Redux/Actions/memo";

const StyledDiv = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item }) => {
	const dispatch = useDispatch();
	return (
		<StyledDiv color={item.bgColor}>
			<h5>Card</h5>
			<button onClick={() => dispatch(delete_card(item.listId))}>카드 삭제</button>
			<BackgroundColorBox listId={item.listId} bgColor={item.bgColor} />
			<FixedButton listId={item.listId} isFixed={item.isFixed} />
			<MemoInput listId={item.listId} />
			<List listId={item.listId} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
