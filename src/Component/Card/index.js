import React from "react";
import styled from "styled-components";
import MemoInput from "./MemoInput";
import List from "./List";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const Card = ({ item, index }) => {
	return (
		<StyledDiv key={index} id={index}>
			<h5>Card</h5>
			<MemoInput index={index} />
			<List index={index} type={item.listType} />
		</StyledDiv>
	);
};

export default Card;
