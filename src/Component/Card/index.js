import React from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import BackgroundColorBox from "./BackgroundColorBox";
import { useDispatch } from "react-redux";
import { copy_card, delete_card } from "../../Redux/Actions/memo";

const StyledDiv = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({card_data}) => {
	const dispatch = useDispatch();
	const {contents, listId, bgColor, isFixed, useCheckbox} = card_data;
	return (
		<StyledDiv color={bgColor}>
			<h5>Card</h5>
			<button onClick={() => dispatch(delete_card(listId))}>카드 삭제</button>
			<button onClick={() => dispatch(copy_card(card_data))}>사본 만들기</button>
			<BackgroundColorBox listId={listId} bgColor={bgColor} />
			<FixedButton listId={listId} isFixed={isFixed} />
			<MemoInput listId={listId} />
			<List listId={listId} contents={contents} useCheckbox={useCheckbox} />
		</StyledDiv>
	);
};

export default Card;
