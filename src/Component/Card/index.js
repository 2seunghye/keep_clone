import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import { useSelector } from "react-redux";
import BackgroundColorBox from "./BackgroundColorBox";
import { css } from "styled-components";

const StyledDiv = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item, isFixed }) => {
	const [color, setColor] = useState("#fff");

	return (
		<StyledDiv color={color}>
			<h5>Card</h5>
			<BackgroundColorBox setColor={setColor} />
			<FixedButton listId={item.listId} isFixed={isFixed} />
			<MemoInput listId={item.listId} />
			<List listId={item.listId} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
