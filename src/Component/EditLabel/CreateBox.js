import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { create_label } from "../../module/label/action";

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

const CreateBox = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const labelState = useSelector((state) => state.labelFetch);

	const hasLabelInLabelList = (_text) => {
		let result = null;
		for (let i = 0; i < labelState.length; ++i) {
			if (labelState[i].text === _text) {
				result = true;
				break;
			}
			result = false;
		}
		return result;
	};

	const addLabel = (_text) => {
		if (!hasLabelInLabelList(_text)) {
			let labelId = parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join(""));
			dispatch(create_label(_text, labelId));
			setInput("");
		} else {
			alert("이미 존재하는 Label 입니다.");
			setInput("");
		}
	};

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			addLabel(input);
		}
	};

	return (
		<StyledAddLabelForm>
			<StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={onEnterKeyPress} placeholder={"라벨 작성..."} />
			<StyledButton
				onClick={() => {
					addLabel(input);
				}}
			>
				추가
			</StyledButton>
		</StyledAddLabelForm>
	);
};

export default CreateBox;
