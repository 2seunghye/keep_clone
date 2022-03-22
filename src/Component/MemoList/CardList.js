import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import styled from "styled-components";

const StyledTitle = styled.h5`
	font-size: 20px;
	color: red;
`;
const CardList = ({ state }) => {
	let otherCardList = state.map((item, index) => {
		if (!item.isFixed && item.isFixed !== undefined) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	let fixedCardList = state.map((item, index) => {
		if (item.isFixed && item.isFixed !== undefined) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});

	return (
		<>
			<div>
				<StyledTitle>고정됨</StyledTitle>
				{fixedCardList}
			</div>
			<div>
				<StyledTitle>기타</StyledTitle>
				{otherCardList}
			</div>
		</>
	);
};

export default CardList;
