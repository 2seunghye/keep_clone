import React from "react";
import styled from "styled-components";

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

const BackgroundColorBox = ({ setColor }) => {
	return (
		<>
			<StyleDiv>
				<StyledButton color={"#fff"} onClick={() => setColor("#fff")}></StyledButton>
				<StyledButton color={"#f3e5f5"} onClick={() => setColor("#f3e5f5")}></StyledButton>
				<StyledButton color={"#ede7f6"} onClick={() => setColor("#ede7f6")}></StyledButton>
				<StyledButton color={"#e8eaf6"} onClick={() => setColor("#e8eaf6")}></StyledButton>
				<StyledButton color={"#e3f2fd"} onClick={() => setColor("#e3f2fd")}></StyledButton>
				<StyledButton color={"#e1f5fe"} onClick={() => setColor("#e1f5fe")}></StyledButton>
				<StyledButton color={"#e0f7fa"} onClick={() => setColor("#e0f7fa")}></StyledButton>
				<StyledButton color={"#e0f2f1"} onClick={() => setColor("#e0f2f1")}></StyledButton>
				<StyledButton color={"#e8f5e9"} onClick={() => setColor("#e8f5e9")}></StyledButton>
				<StyledButton color={"#f1f8e9"} onClick={() => setColor("#f1f8e9")}></StyledButton>
				<StyledButton color={"#f9fbe7"} onClick={() => setColor("#f9fbe7")}></StyledButton>
				<StyledButton color={"#efebe9"} onClick={() => setColor("#efebe9")}></StyledButton>
				<StyledButton color={"#eceff1"} onClick={() => setColor("#eceff1")}></StyledButton>
			</StyleDiv>
		</>
	);
};

export default BackgroundColorBox;
