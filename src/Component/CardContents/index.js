import React from "react";
import { useSelector } from "react-redux";
import { selectContentsById } from "../../module/memoContents";
import { selectNewMemoContents } from "../../module/newMemo";
import TextEditor from "../common/TextEditor";
import CheckboxItem from "./CheckboxItem";

function IndicatorLatestTime({date}){
	return 	<div>{`수정된 시간: ${date.getMonth() + 1}월 ${date.getDate()}일`}</div>
}
function CardContents({memoId, useCheckbox}){
	// console.log("rendering check : card contents");
	const selector = memoId === "temporary" ? selectNewMemoContents : selectContentsById(memoId); 
	const contents = useSelector(selector) || [];
	const placeholderText = {
		title : "제목",
		contents : memoId === "temporary" ? " 작성..." : ""
	};
	return(
		<>
			<TextEditor 
				className={"memo__title"}
				memoId={memoId} 
				placeholderText={placeholderText.title}	
				/>
			{
				useCheckbox ?
				// checkbox list
				contents.map((content) => (
					<CheckboxItem
					key={content.id}
					memoId={memoId}
					content={content}
					/>
				)) :
				// note
				<TextEditor 
					className={"memo__contents"}
					memoId={memoId} 
					placeholderText={`메모${placeholderText.contents}`}
				/>
			}
			{memoId !== "temporary" && <IndicatorLatestTime date={new Date()}/>}
		</>
	)
}
export const memoContents = {IndicatorLatestTime};
export default React.memo(CardContents);
// issue
/*
	#keep 원본의 이슈
	체크박스 -> 노트로 전환할 때, 
	체크한 항목이 있으면 해당 항목을 지우고 노트로 전환하고,
	체크한 항목들이 미체크 항목의 아래에 있던 그대로로 전환한다.
	또한 undo의 대상이 아님.

	이 ui를 수정할 예정. 
	- 항목을 지우지 않고 전환.
	- 전체 미체크 시의 순서로 전환.
	- 반대로 전환 시에도 예전 상태를 기억하도록. (타입 변환에 상관없이 isChecked를 유지)
*/