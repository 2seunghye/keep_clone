import React, { useLayoutEffect, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// toolkit
import { nanoid } from "@reduxjs/toolkit";
// module
import { createMemo, updateMemo, deleteMemo, selectMemos } from "../../module/memo";
// component:called
import Heading from "../common/Heading";
import FixedButton from "./FixedButton";
import CardContents from "../CardContents";
import MemoUI from "./MemoUI";
import AddLabelForm from "../LabelBox/AddLabelForm";
import LabelList from "../LabelBox/LabelList";
import Label, { selectLabel } from "../../module/label";
import LabelBox from "../LabelBox";
// component:styled
const getValueFromTheme = ({theme})=> {
	if(theme.darkmode) return "#333";
	if(!theme.darkmode) return "#fff"
	return theme.color;
};
const CardInner = styled.div`
	background-color : ${getValueFromTheme};
	margin: 20px;
	overflow: hidden;
	transition: width 300ms ease;
`;
// component
function MemoCard({ memo }) {
	const { id, title, useCheckbox, bgColor, isFixed, labels } = memo;
	const dispatch = useDispatch();
	useEffect(() => {
		// getMemoLabels(id);
		console.log(`${id}'s labels`, labels);
	}, [labels]);

	const updateLabelInMemo = (_newLabel, _labelId) => {
		const payload = {
			...memo,
			labels: [...labels, { text: _newLabel, id: _labelId }],
		};
		const action = updateMemo(payload);
		dispatch(action);
	};

	// update memo status:hang on top
	const onToggleFixed = () => {
		const payload = {
			...memo,
			isFixed: !memo.isFixed,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	// add new memo
	const memoMaker = (_input, _setInput) => (event) => {
		// escape
		if (!event.key === "Enter") return false;
		if (_input === "") return false;
		const payload = {
			id: nanoid(),
			text: _input,
		};
		const action = createMemo(payload);
		dispatch(action);
		// reset input value
		_setInput("");
	};
	// Registry DOM event
	const inner = useRef(); // target is CardInner component
	// const contents_classname = "memo-contents";
	const focusable_elements = ["a", "button", "textarea", 'input:not([type="hidden"])', '[tabindex="0"]'].join(",");
	const keyFilter = useCallback(
		function (native_event) {
			const is_pressed_tab = native_event.key.toUpperCase() === "TAB";
			const is_pressed_shift = native_event.shiftKey;
			// escape:not press tab key
			if (!is_pressed_tab) return false;
			//
			const all_elements = native_event.currentTarget.querySelectorAll(focusable_elements);
			const last_element = all_elements[all_elements.length - 1];
			const first_element = all_elements[0];
			const isLast = last_element === native_event.target;
			const isFirst = first_element === native_event.target;
			// escape:not press shift key
			if (!is_pressed_shift) {
				isLast && console.log("straight");
				return false;
			}
			// press tab + shift key
			isFirst && console.log("reverse");
		},
		[focusable_elements]
	);
	useLayoutEffect(() => {
		inner.current.addEventListener("keydown", keyFilter, false);
	}, [keyFilter]);
	// styled theme
	const inner_theme = {
		color : bgColor
	};
	return (
		<CardInner ref={inner} theme={inner_theme} tabIndex={0}>
			{/* <span className="focus-start"></span> */}
			<div className="header">
				<Heading 
					level={"h2"} 
					headcopy={title} 
				/>
				{
					isFixed != null && 
					<FixedButton onToggleFixed={onToggleFixed} isFixed={isFixed} />
				}
			</div>
			<CardContents memoId={id} useCheckbox={useCheckbox} />
			<LabelBox id={id} updateLabelInMemo={updateLabelInMemo} labels={labels} />
			<div className="bottom ui-group">
				<MemoUI memo={memo} />
			</div>
			{/* <span className="focus-end"></span> */}
		</CardInner>
	);
}

export default MemoCard;
// issue
/*
	각각의 메모마다 url을 가짐. active 개념이 아님.
	route 구성을 고민해야 함.
*/