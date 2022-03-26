import React from "react";
import styled from "styled-components";
import MemoCard from "../Card";
// styled component
const GuideText = styled.em`
	font-size: 12px;
	color: black;
`;
// component
// 단순 나열하는 컴포넌트
function MemoContainer({ memos, presentationText }){
	return (
		<div>
			<GuideText>{presentationText}</GuideText>
			{memos.map( memo => 
				<MemoCard 
					key={memo.listId} 
					singleMemoData={memo} 
				/> 
			)}
		</div>
	);
};
// 전체 메모를 분류하는 컴포넌트
function MemoClassfier({ memos }){
	const classfication = [
		"fixed", 
		"nonFixed"
	];
	const presentationText = {
		"fixed" : "고정됨",
		"nonFixed" : "기타"
	}
	const classfiedMemos = {
		"fixed" : memos.filter((memo) => memo.isFixed),
		"nonFixed" : memos.filter((memo) => !memo.isFixed)
	};
	return classfication.map(
		(type) => 
			<MemoContainer 
				key={type}
				memos={classfiedMemos[type]}
				presentationText={presentationText[type]}
			/>
	);
};

export default MemoClassfier;