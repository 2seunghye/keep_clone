import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { change_background_color, update_item } from "../../Redux/Actions/memo";

const StyleDiv = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	flex-wrap: wrap;
`;

const StyledButton = styled.button`
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

const BackgroundColorBox = ({ listId }) => {
	const dispatch = useDispatch();

	const onClickColorBtn = (color) => {
		dispatch(change_background_color(listId, { bgColor: color }));
	};

	return (
		<>
			<StyleDiv>
				<StyledButton color={"#ffffff"} onClick={() => onClickColorBtn("#ffffff")}></StyledButton>
				<StyledButton color={"#f3e5f5"} onClick={() => onClickColorBtn("#f3e5f5")}></StyledButton>
				<StyledButton color={"#ede7f6"} onClick={() => onClickColorBtn("#ede7f6")}></StyledButton>
				<StyledButton color={"#e8eaf6"} onClick={() => onClickColorBtn("#e8eaf6")}></StyledButton>
				<StyledButton color={"#e3f2fd"} onClick={() => onClickColorBtn("#e3f2fd")}></StyledButton>
				<StyledButton color={"#e1f5fe"} onClick={() => onClickColorBtn("#e1f5fe")}></StyledButton>
				<StyledButton color={"#e0f7fa"} onClick={() => onClickColorBtn("#e0f7fa")}></StyledButton>
				<StyledButton color={"#e0f2f1"} onClick={() => onClickColorBtn("#e0f2f1")}></StyledButton>
				<StyledButton color={"#e8f5e9"} onClick={() => onClickColorBtn("#e8f5e9")}></StyledButton>
				<StyledButton color={"#f1f8e9"} onClick={() => onClickColorBtn("#f1f8e9")}></StyledButton>
				<StyledButton color={"#f9fbe7"} onClick={() => onClickColorBtn("#f9fbe7")}></StyledButton>
				<StyledButton color={"#efebe9"} onClick={() => onClickColorBtn("#efebe9")}></StyledButton>
				<StyledButton color={"#eceff1"} onClick={() => onClickColorBtn("#eceff1")}></StyledButton>
			</StyleDiv>
		</>
	);
};

export default BackgroundColorBox;
