import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { create_label_in_card } from "../../module/memo/action";
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

const AddLabelForm = ({ listId }) => {
	const dispatch = useDispatch();
	const [input, setInput] = useState("");
	const labelState = useSelector((state) => state.labelFetch);
	const CardState = useSelector((state) => state.memoFetch);

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

	const hasLabelInCard = (_text) => {
		let result = null;
		let listLabels;

		CardState.forEach((item) => {
			console.log(item.listId == listId, item.listId, listId);
			if (item.listId == listId) {
				listLabels = item.labels;
			}
		});

		if (listLabels.length !== undefined) {
			for (let i = 0; i < listLabels.length; ++i) {
				if (listLabels[i].text === _text) {
					result = true;
					break;
				}
				result = false;
			}
		} else {
			result = false;
		}

		return result;
	};

	const addLabelInCard = (listId, _text, _labelId) => {
		if (hasLabelInCard(_text)) {
			// 메모 카드에 이미 등록된 라벨
			alert("해당 메모에 이미 등록된 라벨입니다!");
		} else {
			// 메모 카드에 라벨을 등록
			dispatch(create_label_in_card(listId, _text, _labelId));
			setInput("");
		}
	};

	const addLabel = (listId, _text) => {
		console.log(!hasLabelInLabelList(_text));
		if (!hasLabelInLabelList(_text)) {
			// 라벨 리스트에 존재하지 않음
			let labelId = parseInt([0, 0, 0, 0].map((v) => Math.floor(Math.random() * 10)).join(""));
			// Todo :: 순차적으로 바꾸기
			dispatch(create_label(_text, labelId));
			dispatch(create_label_in_card(listId, _text, labelId));
			setInput("");
		} else {
			// 라벨 리스트에 존재 함
			let labelId = null;
			labelState.forEach((item) => {
				if (item.text === _text) {
					labelId = item.id;
				}
			});
			addLabelInCard(listId, _text, labelId);
		}
	};

	const onEnterKeyPress = (e) => {
		if (e.key === "Enter") {
			addLabel(listId, input);
		}
	};

	return (
		<StyledAddLabelForm>
			<StyledInput value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={onEnterKeyPress} placeholder={"라벨 작성..."} />
			<StyledButton
				onClick={() => {
					addLabel(listId, input);
				}}
			>
				추가
			</StyledButton>
		</StyledAddLabelForm>
	);
};

export default AddLabelForm;
