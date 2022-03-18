import React, { useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { create_checkbox, create_item, update_checkbox } from "../../Redux/Actions/checkbox";

const StyledInputBox = styled.div`
	width: 100%;
	display: flex;
	gap: 15px;
`;

const StyledInput = styled.input`
	flex: 5;
	width: 100%;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 7px;
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

const MemoInput = ({ index }) => {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			if (input !== "") {
				dispatch(create_item(index, input));
				setInput("");
			}
		}
	};

	return (
		<StyledInputBox>
			<StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={onEnterKeyPress} placeholder={"메모 작성..."} required />
		</StyledInputBox>
	);
};

export default MemoInput;
