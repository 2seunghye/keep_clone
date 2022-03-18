import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { create_label } from "../../Redux/Actions/label";

const StyledAddLabelForm = styled.div`
	display: flex;
	gap: 15px;
`;

const StyledInput = styled.input`
	flex: 5;
	width: 100%;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
`;

const StyledButton = styled.button`
	flex: 1;
	width: 100%;
	cursor: pointer;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
`;

const AddLabelForm = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");

	const onClick = () => {
		dispatch(create_label(input));
		setInput("");
	};

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			dispatch(create_label(input));
			setInput("");
		}
	};

	return (
		<StyledAddLabelForm>
			<StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={onEnterKeyPress} placeholder={"라벨 작성..."} />
			<StyledButton onClick={onClick}>추가</StyledButton>
		</StyledAddLabelForm>
	);
};

export default AddLabelForm;
