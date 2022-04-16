import React from "react";
import styled from "styled-components";

// styled component
const ColorPickerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
	padding:10px 0;
`;
const ColorPickerButton = styled.button`
	cursor: pointer;
	width: 25px;
	height: 25px;
	border: 1px solid #dedede;
	border-radius: 50%;
	background-color:${({theme})=>theme.color};
	&:hover {
		border: 1px solid #333;
	}
`;

// component
function BackgroundColorPicker({ colorPalette, dispatchColor }){
	return(
		<ColorPickerContainer>
			{colorPalette.map(color => 
				<ColorPickerButton
					key={color}
					theme={{color}}
					data-color={color}
					onClick={dispatchColor} />
			)}
		</ColorPickerContainer>
	);
};

export default BackgroundColorPicker;