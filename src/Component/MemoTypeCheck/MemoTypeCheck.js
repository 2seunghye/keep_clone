import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { create_check_card, create_text_card } from "../../Redux/Actions/checkbox";
import List from "./List";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const MemoTypeCheck = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.checkboxFetch);

	let cardList = state.map((item, index) => {
		return (
			<StyledDiv key={index} id={index}>
				<Input index={index} />
				<List index={index} type={item.listType} />
			</StyledDiv>
		);
	});

	return (
		<>
			<button onClick={() => dispatch(create_check_card())}>체크박스 추가</button>
			<button onClick={() => dispatch(create_text_card())}>텍스트 추가</button>
			{cardList}
		</>
	);
};

export default MemoTypeCheck;
