import React from "react";
import styled from "styled-components";
// component:styled
const Button = styled.button`
	cursor: pointer;
	border: none;
	padding: 7px 13px;
	font-size: 14px;
	background-color:transparent;
	&:hover {
		background-color:hsla(0, 100%, 100%, 0.4);
	}
`;
const Icon = styled.span`

`;
const ButtonName = styled.span`

`;
function UIButton({name, interaction}){
	const useBackgroundImg = false;
	return(
		<Button type="button" onClick={interaction}>
			{			
				useBackgroundImg ?
				<Icon bgimage={""} /> :
				<Icon></Icon>
			}			
			<ButtonName>{name}</ButtonName>
		</Button>
	);
};

export default UIButton;