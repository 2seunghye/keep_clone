import React from "react";
import styled from "styled-components";
// component:called
import MemoCard from "../Card";
// component:styled
const GuideText = styled.em`
	font-size: 12px;
	color: black;
`;
const Wrap = styled.div`
	outline:1px solid lightcoral;
`;
// component
function MemoContainer({ memos, text }){
	return (
		<Wrap>
			<GuideText>{text}</GuideText>
			{memos.map( memo => <MemoCard key={memo.id} memo={memo} /> )}
		</Wrap>
	);
};
function MemoClassfier({ memos }){
	const format = [
		{
			name : "fixed memo",
			presentationText : "고정됨", 
			list : []
		},
		{
			name : "non fixed memo",
			presentationText : "기타", 
			list : []
		}
	];
	const callback = (_format, memo)=> {
		const targetList = _format[memo.isFixed ? 0 : 1].list;
		targetList.push(memo); 
		return _format;
	};
	const memos__classfied = memos.reduce(callback, format);
	return memos__classfied.map(
		({ name, list, presentationText }) => 
			<MemoContainer 
				key={name}
				memos={list} 
				text={presentationText} 
			/>
	);
};

export default MemoClassfier;