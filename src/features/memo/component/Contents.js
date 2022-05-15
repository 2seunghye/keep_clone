import React from "react";
import { useSelector } from "react-redux";
// from global
import TextEditor from "features/global/component/TextEditor";
import { selectNewMemoContents } from "features/global/newMemoSlice";
// from memo
import CheckboxItem from "features/memo/component/CheckboxItem";
import { selectContentsById } from "features/memo/memoContentsSlice";

const new_memo_id = "temporary";
function Contents({memoId, useCheckbox}){
	const selector = new_memo_id === memoId ? selectNewMemoContents : selectContentsById(memoId); 
	const selectState = useSelector(selector) || [];
	const placeholderText = {
		title : "제목",
		contents : new_memo_id === memoId ? " 작성..." : ""
	};
	// parsing to valid html string 
	const to_text = selectState.map(content => content.text).join("\n\n");
	const parse_text = to_text.replaceAll(/(\n)\s/g, "<br/>")
	return(
		useCheckbox ?
		// checkbox list
		selectState.map((content) => (
			<CheckboxItem
				key={content.id}
				memoId={memoId}
				content={content}
			/>
		)) :
		// note
		<TextEditor 
			memoId={memoId} 
			pretext={parse_text}
			className={"memo__contents"}
			placeholderText={`메모${placeholderText.contents}`}
		/>
	)
}
export default React.memo(Contents);
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