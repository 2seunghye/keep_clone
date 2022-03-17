import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { create_label_in_card } from "../../../Redux/Actions/checkbox";
import { create_label } from "../../../Redux/Actions/label";

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

const AddLabelForm = ({ index }) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const [labelId, setLabelId] = useState(0);
	const labelState = useSelector((state) => state.labelFetch);
	const CardState = useSelector((state) => state.checkboxFetch);

	const hasLabelInLabelList = (_text) => {
		let result = null;
		for (let i = 0; i < labelState.length; ++i) {
			if (labelState[i].text == _text) {
				result = true;
				break;
			}
			result = false;
		}
		return result;
	};

	const hasLabelInCard = (_index, _text) => {
		let result = null;
		const listLabels = CardState[index].listLabels;

		for (let i = 0; i < listLabels.length; ++i) {
			if (listLabels[i].text == _text) {
				result = true;
				break;
			}
			result = false;
		}
		return result;
	};

	const addLabelInCard = (_index, _labelId, _text) => {
		if (hasLabelInCard(_index, _text)) {
			alert("이미 등록된 라벨입니다!");
		} else {
			console.log("라벨을 카드에 등록");
			dispatch(create_label_in_card(_index, _labelId, _text));
			setInput("");
		}
	};

	const add = (_index, _text) => {
		if (!hasLabelInLabelList(_text)) {
			let labelId = parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join(""));
			console.log("라벨 리스트에 없음");
			dispatch(create_label(_text, labelId));
			dispatch(create_label_in_card(_index, labelId, _text));
			setInput("");
		} else {
			let labelId = -1;
			console.log("라벨 리스트에 있음");
			labelState.forEach((item) => {
				if (item.text == _text) {
					labelId = item.id;
				}
			});
			addLabelInCard(_index, labelId, _text);
		}
	};

	const onClick = () => {
		for (let i = 0; i < labelState.length; ++i) {
			console.log(labelState[i].text == input, labelState[i].text, input);
			if (labelState[i].text == input) {
				setLabelId(labelState[i].id);
				break;
			}
		}
		// dispatch(create_label_in_card(index, input));
		// setInput("");
		add(index, input);
	};

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			for (let i = 0; i < labelState.length; ++i) {
				console.log(labelState[i].text == input, labelState[i].text, input);
				if (labelState[i].text == input) {
					setLabelId(labelState[i].id);
					break;
				}
			}
			// dispatch(create_label_in_card(index, input));
			// setInput("");
			add(index, input);
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
