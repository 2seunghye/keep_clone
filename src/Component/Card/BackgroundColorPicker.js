import React from "react";
import styled from "styled-components";
import colorPalette from "../../data/color";

// styled component
const ColorPickerContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	flex-wrap: wrap;
`;
const ColorPickerButton = styled.button`
	cursor: pointer;
	width: 25px;
	height: 25px;
	border: 1px solid #dedede;
	border-radius: 50%;
	background: ${(props) => props.color || "#fff"};
	&:hover {
		border: 1px solid #333;
	}
`;

// component
function BackgroundColorPicker({ dispatchColor }){
	return(
		<ColorPickerContainer>
			{colorPalette.map(color => 
				<ColorPickerButton color={color} onClick={dispatchColor} />
			)}
		</ColorPickerContainer>
	);
};

export default BackgroundColorPicker;