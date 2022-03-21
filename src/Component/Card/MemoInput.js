import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { create_item } from "../../Redux/Actions/memo";

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
	border-radius: 5px;
`;

const MemoInput = ({ listId }) => {
	const [input, setInput] = useState("");
	const dispatch = useDispatch();

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			if (input !== "") {
				dispatch(create_item(listId, input));
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
