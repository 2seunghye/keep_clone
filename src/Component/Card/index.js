import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
// module
import { createMemo, updateMemo, deleteMemo, copyMemo } from "../../module/memo";
// component:called
import Heading from "../common/Heading";
import MemoInput from "./MemoInput";
import FixedButton from "./FixedButton";
import BackgroundColorPicker from "./BackgroundColorPicker";
import ContentItem from "../CardContents";
import AddLabelForm from "../LabelBox/AddLabelForm";
// component:styled
const CardInner = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;
const UIButton = styled.button`
	color : ${(props) => (props.isPrimary ? "white" : "black")}
	background-color : ${(props) => (props.isPrimary ? "steelblue" : "ivory")}
`;
// component
function MemoUI({ memo }) {
	const dispatch = useDispatch();
	const onClick = () => {
		dispatch(
			createMemo({
				...memo,
				listId: nanoid(),
			})
		);
	};
	return (
		<>
			<UIButton type="button" isPrimary={false} onClick={onClick}>
				카드 삭제
			</UIButton>
			<UIButton type="button" isPrimary={true} onClick={onClick}>
				사본 만들기
			</UIButton>
		</>
	);
}
function MemoCard({ singleMemoData }) {
	const { contents, listId, bgColor, isFixed, useCheckbox } = singleMemoData;
	const dispatch = useDispatch();
	// state update function
	// update memo bg color
	const onChoiceColor = (color) => {
		const payload = {
			listId,
			bgColor: color,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	// update memo status:hang on top
	const onToggleFixed = () => {
		const payload = listId;
		const action = updateMemo(payload);
		dispatch(action);
	};
	// add new memo
	const memoMaker = (_input, _setInput) => (event) => {
		// escape
		if (!event.key === "Enter") return false;
		if (_input === "") return false;
		const payload = {
			listId,
			text: _input,
		};
		const action = createMemo(payload);
		dispatch(action);
		// reset input value
		_setInput("");
	};
	return (
		<CardInner color={bgColor}>
			<Heading level={"h2"} headcopy={"Memo"} />
			<BackgroundColorPicker dispatchColor={onChoiceColor} />
			<FixedButton onToggleFixed={onToggleFixed} isFixed={isFixed} />
			<MemoInput memoMaker={memoMaker} />
			{contents.map((content) => (
				<ContentItem key={content.id} content={content} useCheckbox={useCheckbox} />
			))}
			<MemoUI memo={singleMemoData} />
			<AddLabelForm listId={listId} />
		</CardInner>
	);
}

export default MemoCard;
