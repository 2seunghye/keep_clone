import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContentsById, updateSingleContent, removeSingleContent } from "../../module/memoContents";
import CheckboxItem from "./CheckboxItem";

function TextEditor({memoId, contents}){
	console.log("rendering check : content item default");
	const to_text = contents.map(content => content.text).join("\n\n");
	const parse_text = to_text.replaceAll(/(\n)\s/g, "<br/>")
	return(
		<div 
			contentEditable="true" 
			spellCheck="true"
			onBlur={()=>{}}
		>
			{parse_text}		
		</div>
	);
}
function Placeholder({placeholderText}){
	return <div>{placeholderText}</div>;
}
function IndicatorLatestTime({date}){
	return 	<div>{`수정된 시간: ${date.getMonth() + 1}월 ${date.getDate()}일`}</div>
}
function CardContents({className, memoId, useCheckbox}){
	console.log("rendering check : card contents");
	const contents = useSelector(selectContentsById(memoId)) || [];
	return(
		<div className={className}>
			{0 >= contents.length && 
				<Placeholder 
					placeholderText={"메모 작성..."} />
			}
			{
				useCheckbox 
				?
				// checkbox list
				contents.map((content) => (
					<CheckboxItem
						key={content.id}
						memoId={memoId}
						content={content}
					/>
				)) 
				:
				// text editor
				<TextEditor 
					memoId={memoId}
					contents={contents}/>
			}
			<IndicatorLatestTime 
				date={new Date()} />
		</div>
	)
}
export default CardContents;