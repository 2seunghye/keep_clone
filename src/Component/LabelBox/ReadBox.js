import React from "react";
import styled, { css } from "styled-components";

const StyledSpan = styled.span`
	display: inline-block;
`;
const ReadBox = ({ text, setIsActive }) => {
	return (
		<div>
			<StyledSpan onDoubleClick={() => setIsActive(true)}>{text}</StyledSpan>
		</div>
	);
};

export default ReadBox;
