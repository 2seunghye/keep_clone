import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import styled from "styled-components";

const StyledTitle = styled.h5`
	font-size: 20px;
	color: red;
`;

const OtherCardList = ({ state }) => {
	return state.map((item, index) => {
		if (!item.isFixed) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});
};

const FixedCardList = ({ state }) => {
	return state.map((item, index) => {
		if (item.isFixed) {
			return <Card key={index} item={item} listId={item.listId} isFixed={item.isFixed} />;
		}
	});
};

const CardList = ({ state }) => {
	return (
		<>
			<div>
				<StyledTitle>고정됨</StyledTitle>
				<FixedCardList state={state} />
			</div>
			<div>
				<StyledTitle>기타</StyledTitle>
				<OtherCardList state={state} />
			</div>
		</>
	);
};

export default CardList;
