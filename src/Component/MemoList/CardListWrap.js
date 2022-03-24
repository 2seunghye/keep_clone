import React from "react";
import Card from "../Card";
import styled from "styled-components";
// styled component
const GuideText = styled.em`
	font-size: 20px;
	color: red;
`;

// component
function OtherCardList({ state }){
	return (
		state
		.filter((item) => !item.isFixed)
		.map((item, index) => <Card key={index} card_data={item}/>)
	)
};
function FixedCardList({ state }){
	return (
		state
		.filter((item) => item.isFixed)
		.map((item, index) => <Card key={index} card_data={item}/>)
	)
};
function CardListWarp({state}){
	return (
		<>
			<GuideText>고정됨</GuideText>
			<FixedCardList state={state} />
			{/*  */}
			<GuideText>기타</GuideText>
			<OtherCardList state={state} />
		</>
	);
};

export default CardListWarp;
