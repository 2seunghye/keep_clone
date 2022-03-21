import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
	display: inline-block;
`;
const ReadBox = ({ text }) => {
	return (
		<div>
			<StyledSpan>{text}</StyledSpan>
		</div>
	);
};

export default ReadBox;
