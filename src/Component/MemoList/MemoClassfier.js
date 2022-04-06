import React from "react";
import styled from "styled-components";
// component:called
import MemoCard from "../Card";
// component:styled
const GuideText = styled.em`
	font-size: 12px;
	color: black;
`;
// component
function MemoContainer({ memos, text }){
	return (
		<div>
			<GuideText>{text}</GuideText>
			{memos.map( memo => <MemoCard key={memo.listId} singleMemoData={memo} /> )}
		</div>
	);
};
function MemoClassfier({ memos }){	// 전체 메모를 분류하는 컴포넌트
	// 각각 구분하는 방식
	// const fiexdMemos = memos.filter((memo) => memo.isFixed);
	// const nonFixedMoemos = memos.filter((memo) => !memo.isFixed);
	// 한번에 구분하는 방식
	// const format = new Object({
	// 	"nonFixed" : [],
	// 	"fixed" : [],
	// });	<= 렌더링에 object가 유리하지 않아 버림.
	// const format = [
	// 	[], // non fixed memo
	// 	[] // fixed memo
	// ];	<= 각 배열의 성격이 명시적이지 않아 버림.
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
	];	// <= store에 처음부터 이런 형태로 분류해서 넣는 게 좋다고 보이지만, 순회를 양자 모두에서 해야하는 번거로움이 생겨서 로직을 무의미하게 늘림. 그래서 패스.
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