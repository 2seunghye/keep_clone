import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item, isFixed }) => {
	return (
		<StyledDiv>
			<h5>Card</h5>
			<FixedButton listId={item.listId} isFixed={isFixed} />
			<MemoInput listId={item.listId} />
			<List listId={item.listId} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
