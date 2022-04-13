import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createLabel, selectLabel, updateLabel } from "../../module/label";
import { nanoid } from "@reduxjs/toolkit";

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

const AddLabelForm = ({ id, memoLabels, setMemoLabels }) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const labelState = useSelector(selectLabel);

	const hasLabelInLabelList = (_text) => {
		for (let i = 0; i < labelState.length; ++i) {
			if (labelState[i].text === _text) return true;
		}
		return false;
	};

	const hasLabelInCard = (_text) => {
		let bool = false;
		labelState.forEach((label) => {
			if (label.text == _text) {
				label.memoGroup.forEach((item) => {
					if (item == id) {
						bool = true;
						return;
					}
				});
			}
		});
		return bool;
	};

	const addLabelInCard = (_text) => {
		if (hasLabelInCard(_text)) {
			// 메모 카드에 이미 등록된 라벨
			alert("해당 메모에 이미 등록된 라벨입니다!");
		} else {
			setMemoLabels([...memoLabels, _text]);
		}
	};

	const addLabel = (id, _text) => {
		if (!hasLabelInLabelList(_text)) {
			console.log("라벨 리스트에 존재하지 않음");
			const payload = {
				id: nanoid(),
				text: input,
				memoGroup: [id],
			};
			const action = createLabel(payload);
			dispatch(action);
			setInput("");
		} else {
			console.log("라벨 리스트에 존재함");
			labelState.forEach((item) => {
				if (item.text === _text) {
					const payload = {
						id: item.id,
						text: item.text,
						memoGroup: Array.from(new Set([...item.memoGroup, id])),
					};
					const action = updateLabel(payload);
					dispatch(action);
				}
			});
			setInput("");
		}

		addLabelInCard(_text);
	};

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			addLabel(id, input);
		}
	};

	return (
		<StyledAddLabelForm>
			<StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={onEnterKeyPress} placeholder={"라벨 작성..."} />
			<StyledButton onClick={() => addLabel(id, input)}>추가</StyledButton>
		</StyledAddLabelForm>
	);
};

export default AddLabelForm;
