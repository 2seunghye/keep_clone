import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// data
import { color_palette } from "../../data/color";
// module
import { selectMemoById, updateMemo } from "../../module/memo";

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
function BackgroundColorPicker({ colorPalette = color_palette}){
	const memoId = useSelector(state => state.app.popup.memoId);
	const memo = useSelector(selectMemoById(memoId));
	const dispatch = useDispatch();
	const onChoiceColor = (_memo)=>(event) => {
		const payload = {
			..._memo,
			bgColor: event.target.dataset.color,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	return(
		<ColorPickerContainer>
			{colorPalette.map(color => 
				<ColorPickerButton
					key={color}
					theme={{color}}
					data-color={color}
					onClick={onChoiceColor(memo)} />
			)}
		</ColorPickerContainer>
	);
};

export default BackgroundColorPicker;