import React, { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
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
// component:styled
const CardInner = styled.div`
	background-color : ${(props) => props.color}
	margin: 20px;
	overflow: hidden;
	transition: width 300ms ease;
	width: ${(props) => (props.isActive ? "auto" : "250px")};
`;
// component
function MemoCard({ memo }) {
	const { id, useCheckbox, bgColor, isFixed, isActive, labels } = memo;
	const dispatch = useDispatch();
	const memoState = useSelector(selectMemos);
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
	const onInactive = () => {
		const payload = {
			...memo,
			isActive: false,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const onActive = () => {
		const payload = {
			...memo,
			isActive: true,
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
	const contents_classname = "memo-contents";
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
	return (
		<CardInner ref={inner} color={bgColor} isActive={isActive} tabIndex={0}>
			{/* <span className="focus-start"></span> */}
			<div className="header">
				<Heading level={"h2"} headcopy={"Memo"} />
				{isFixed != null && <FixedButton onToggleFixed={onToggleFixed} isFixed={isFixed} />}
			</div>
			<CardContents memoId={id} useCheckbox={useCheckbox} className={contents_classname} />
			<AddLabelForm id={id} updateLabelInMemo={updateLabelInMemo} labels={labels} />
			<LabelList labels={labels} />
			<div className="bottom ui-group">
				<MemoUI memo={memo} />
			</div>
			{/* <span className="focus-end"></span> */}
		</CardInner>
	);
}

export default MemoCard;
