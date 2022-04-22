import React, { useCallback, useLayoutEffect, useState } from "react";
import styled from "styled-components";
// toolkit
import { useDispatch, useSelector } from "react-redux";
// module
import { createMemo, updateMemo } from "../../module/memo";
// custom hooks
import useTrapFocus from "../../customHooks/useTrapFocus";

// component:called
import MemoUI from "../Card/MemoUI";
import TextEditor from "../common/TextEditor";
import { newMemoSlice, refreshNewMemo, selectNewMemo, updateNewMemo } from "../../module/newMemo";
import { nanoid } from "@reduxjs/toolkit";
import { createContents } from "../../module/memoContents";
import CardContents from "../CardContents";

// component:styled
const Inner = styled.div.attrs(()=>({tabIndex : 0}))`
	position:relative;
	background-color:${(props)=>props.isActive ? "ivory" : "#f1f1f1"};
	.memo__title {
		display: ${(props)=>props.isActive ? "block" : "none"}
	};
	.type-pre-selector {
		display: ${(props)=>props.isActive ? "none" : "block"};
		position:absolute;
		top:0;
		right:0;
		button {
			cursor:pointer;
		}
	}
`;
// component
function MemoCreator(){
	const dispatch = useDispatch();
	const newMemo = useSelector(selectNewMemo);
	const {id : newMemoId, useCheckbox} = newMemo;
	const initialMemo = newMemoSlice.getInitialState();
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
	// event:activate memo window
	const rootClassName = ".memo--new";
	const [active, setActive] = useState(false);
	const onStart = useCallback(
		()=>{
			setActive(true);
			const payload = {
				useCheckbox : true
			};
			const action = updateNewMemo(payload);
			dispatch(action);
		},
		[dispatch]
	);
	const clickHandler = useCallback(
		function(event){
			if(event.target instanceof HTMLButtonElement) return false;
			setActive(true);
		}, [setActive]
	);
	const focusHandler = useCallback(
		function(event){
			console.log("target display :", window.getComputedStyle(event.target).getPropertyValue("display"));
			console.log(event.relatedTarget);
			const isStillIn = event.relatedTarget?.closest(rootClassName); 
			if(event.target.closest(".type-pre-selector")) return false;
			if(isStillIn) return false;
			setActive(false);
			
			// next1::push memo
			// const [title_editor, contents_editor]  = this.querySelectorAll("[contenteditable='true']");
			// const titleIsEmpty = 0 >= title_editor.innerText.length;
			// const contentsIsEmpty = 0 >= contents_editor.innerText.length;
			// if(titleIsEmpty && contentsIsEmpty) return false;
			// console.group("next1");
			// const memo_id = nanoid();
			// const payload = {
			// 	...initialMemo,
			// 	id : memo_id,
			// 	title : title_editor.innerText,
			// 	useCheckbox
			// };
			// const action = createMemo(payload);
			// dispatch(action);
			// console.groupEnd("next1");
			// // next2:push contents
			// const payload1 = contents_editor.innerText.split("\n").reduce((acc, val, idx)=>{
			// 	console.log(idx, val, acc);
			// 	let line = {};
			// 	line.id = nanoid();
			// 	line.text = val;
			// 	// useCheckbox && (line.isChecked = false); 
			// 	acc.push(line);
			// 	return acc;
			// },[]);
			// const action2 = Object.assign(
			// 	createContents(payload1),
			// 	{id : memo_id}
			// );
			// console.group("next2");
			// console.log("payload1 :", payload1);
			// console.log("action2 :", action2);
			// dispatch(action2);
			// console.groupEnd("next2");
			// // next3:refresh
			// title_editor.innerText = "";
			// !useCheckbox && (contents_editor.innerText = "");
			// dispatch(refreshNewMemo({}));
		}, 
		[]
		// [useCheckbox, initialMemo, dispatch]
	)
	useLayoutEffect(
		()=> {
			document.querySelector(rootClassName).addEventListener("click", clickHandler, false);
			document.querySelector(rootClassName).addEventListener("focusout", focusHandler, false);
		}, 
		[clickHandler, focusHandler]
	);
	return(
		<Inner className="memo--new" isActive={active}>
			<CardContents 
				memoId={newMemoId} 
				useCheckbox={useCheckbox} 
			/>
			<MemoUI 
				uiList={ui_list}
			/>
			{/* preset ui */}
			<div className="type-selector">
				<button type="button" onClick={onStart}>새 목록</button>
				<button type="button" onClick={()=>{}}>그림이 있는 새 메모</button>
				<button type="button" onClick={()=>{}}>이미지가 있는 새 메모</button>
			</div>
		</Inner>
	);
};

export default MemoCreator;