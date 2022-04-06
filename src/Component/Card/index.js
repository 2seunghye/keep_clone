import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// toolkit
import { nanoid } from '@reduxjs/toolkit'
// module
import { createMemo, updateMemo, deleteMemo } from "../../module/memo";
// component:called
import Heading from "../common/Heading";
import FixedButton from "./FixedButton";
import ContentItem from "../CardContents";
import MemoUI from "./MemoUI";
// component:styled
const CardInner = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;
// component
function MemoCard({singleMemoData}){
	const {contents, listId, bgColor, isFixed, useCheckbox} = singleMemoData;
	const dispatch = useDispatch();
	// state update function
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
			text : _input 
		};
		const action = createMemo(payload);
		dispatch(action);
		// reset input value
		_setInput("");
	};
	return (
		<CardInner color={bgColor}>
			<div className="header">
				<Heading 
					level={"h2"} 
					headcopy={"Memo"} />
				<FixedButton 
					onToggleFixed={onToggleFixed} 
					isFixed={isFixed} />
			</div>
			<div className="memo-contents">
				{
					0 >= contents.length &&
					<div>{"메모 작성..."}</div>
				} 
				{contents.map( content => (
					<ContentItem 
						key={content.id}
						content={content} 
						useCheckbox={useCheckbox} />
				))}
				<div className="latest-modified-time">
					{`수정된 시간: ${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}
				</div>
			</div>
			<div className="bottom ui-group">
				<MemoUI memo={singleMemoData} />
			</div>
		</CardInner>
	);
};

export default MemoCard;