import React from "react";
import styled from "styled-components";
import {color_palette} from "../../data/color";

// styled component
const ColorPickerContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
	padding:10px 0;
	background-color: ${props => props.darkmode ? "#333" : "#fff"}
`;
const ColorPickerButton = styled.button`
	cursor: pointer;
	width: 25px;
	height: 25px;
	border: 1px solid #dedede;
	border-radius: 50%;
	background: ${(props) => props["data-color"] || "#fff"}};
	&:hover {
		border: 1px solid #333;
	}
`;

// component
function BackgroundColorPicker({ dispatchColor }){
	return(
		<ColorPickerContainer darkmode>
			{color_palette.map(color => 
				<ColorPickerButton
					key={color}
					data-color={color}
					onClick={dispatchColor} />
			)}
		</ColorPickerContainer>
	);
};

export default BackgroundColorPicker;