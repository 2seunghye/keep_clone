import React, { useLayoutEffect, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// toolkit
import { nanoid } from "@reduxjs/toolkit";
// module
import { createMemo, updateMemo, deleteMemo, copyMemo, selectMemos } from "../../module/memo";
// component:called
import Heading from "../common/Heading";
import FixedButton from "./FixedButton";
import CardContents from "../CardContents";
import MemoUI from "./MemoUI";
import LabelTag from "./LabelTag";
import LabelBox from "../LabelBox";
import Popup, {PopupCaller} from "../common/Popup";
import UIButton from "../common/UIButton";
// component:styled
const getValueFromTheme = ({ theme }) => {
	if (theme.darkmode === true) return "#333";
	if (theme.darkmode === false) return "#fff";
	return theme.color;
};
const CardInner = styled.div`
	background-color: ${getValueFromTheme};
	margin: 20px;
	overflow: hidden;
	transition: width 300ms ease;
`;
// component
function MemoCard({ memo }) {
	const { id, title, useCheckbox, bgColor, isFixed, labels } = memo;
	const dispatch = useDispatch();
	const updateLabelInMemo = (_newLabel, _labelId) => {
		const payload = {
			...memo,
			labels: [...labels, { text: _newLabel, id: _labelId }],
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const deleteLabelInMemo = (_newLabel) => {
		const newLabels = labels.filter((item) => item.text != _newLabel);
		const payload = {
			...memo,
			labels: newLabels,
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
	// memoui
	const ui_list = [
		{
			name: "나에게 알림",
			hasMenu : false,
			interaction: ()=>{},
		},
		{
			name: "공동 작업자",
			hasMenu : false,
			interaction: ()=>{},
		},
		{
			name: "배경 옵션",
			hasMenu : true,
			interaction: ()=>{},
		},
		{
			name: "이미지 추가",
			hasMenu : false,
			interaction: () => {
				// input file과 동일
				// 확장자 필터 필요
			},
		},
		{
			name: "보관 처리",
			hasMenu : false,
			interaction: (_memo) => {
				const payload = {
					..._memo,
					isKeep: true,
				};
				const action = updateMemo(payload);
				dispatch(action);
			},
		},
		{
			name: "보관 취소",
			hasMenu : false,
			interaction: (_memo) => {
				const payload = {
					..._memo,
					isKeep: false,
				};
				const action = updateMemo(payload);
				dispatch(action);
			},
		},
	];
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
		color: bgColor,
	};
	return (
		<CardInner ref={inner} theme={inner_theme} tabIndex={0}>
			{/* <span className="focus-start"></span> */}
			<div className="header">
				<Heading level={"h2"} headcopy={title} />
				{isFixed != null && <FixedButton onToggleFixed={onToggleFixed} isFixed={isFixed} />}
			</div>
			<CardContents memoId={id} useCheckbox={useCheckbox} />
			<LabelTag memoId={id} labelGroup={labels} />
			<div
				className="bottom ui-group"
				style={{
					"display" : "flex",
					"flexDirection" : "row",
				}}
			>
				{ui_list.map(({ name, interaction, hasMenu }) => {
					if(hasMenu) return <PopupCaller key={name} name={name} callerId={id} />
					return <UIButton key={name} name={name} interaction={interaction} />
				})}
				<PopupCaller name={"더보기"} callerId={id}/>
			</div>
			<Popup keyname={"라벨"} contents={<LabelBox id={id} keyname={"라벨"} updateLabelInMemo={updateLabelInMemo} labels={labels} />}/>
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
