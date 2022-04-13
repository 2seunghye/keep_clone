import React from "react";
import styled from "styled-components";
const Icon = styled.span`

`;
const ScreenOnlyText = styled.span`
	overflow:hidden;
	position:relative;
	z-index:-1;
	clip:rect(0,0,0,0);
	width:1px;
	height:1px;
	opacity:0;
	color:transparent;
`;
const FixedButton = ({ isFixed, onToggleFixed }) => {
	return (
		<button 
			onClick={onToggleFixed}
		>
			<Icon />
			<ScreenOnlyText>{isFixed ? "고정 해제" : "고정"}</ScreenOnlyText>
		</button>
	);
};

export default FixedButton;
