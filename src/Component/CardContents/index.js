import React from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeContents, selectContentsById, updateSingleContent, removeSingleContent } from "../../module/memoContents";
const Icon = Styled.i`
	display:inline-block;
	vertical-align:middle;
	background-color:white;
	width:18px;
	height:18px;
	padding:2px;
	box-sizing:content-box;
`;
const Item = Styled.div`
	display:flex;
	padding:10px;
	&:not(:first-child) {
		margin-top:15px;
	}
	[contenteditable] {
		flex:1;
		padding:0 5px;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow:hidden;
	}
`;

function CheckboxTypeItem({memoId, content}){
	console.log("rendering check : content item checkbox");
	const {id, text, isChecked} = content;
	const dispatch = useDispatch();
	const removeContent = ()=>{
		const payload = {
			...content
		};
		const action = Object.assign(
			removeSingleContent(payload), 
			{memoId}
		);
		dispatch(action);
	};
	const updateContentText = (event) => {
		// escape:equal after and before; 
		if(text === event.target.innerText) return false;
		// escape:there is no letters
		if(0 >= event.target.innerText.length) return removeContent();
		const payload = {
			...content,
			text : event.target.innerText,
		};
		const action = Object.assign(
			updateSingleContent(payload), 
			{memoId}
		);
		dispatch(action);
	};
	const toggleChecked = () => {
		const payload = {
			...content,
			isChecked : !isChecked
		};
		const action = Object.assign(
			updateSingleContent(payload), 
			{memoId}
		);
		dispatch(action);
	};
	const keydown = (event)=>{
		if(event.key !== "Enter") return false;
		console.log("enter key!");
		updateContentText(event);
	};
	return(
		<Item>
			<label htmlFor={id}>
				<input 
					id={id}
					type="checkbox" 
					checked={isChecked}
					onChange={toggleChecked}
				/>
			</label>
			<div 
				contentEditable="true" 
				spellCheck="true"
				onBlur={updateContentText}
				onKeyDown={keydown}
			>
				{text}		
			</div>
			<button type="button" onClick={removeContent}>
				<Icon />
				<span>{"Delete"}</span>
			</button>
		</Item>
	);
}
function DefaultTypeItem({contents}){
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
	const contents = useSelector(selectContentsById(memoId));
	return(
		<div className={className}>
			{0 >= contents.length && 
				<Placeholder 
					placeholderText={"메모 작성..."} />
			}
			{
				useCheckbox ?
				contents.map((content) => (
					<CheckboxTypeItem 
						key={content.id}
						memoId={memoId}
						content={content}
					/>
				)) :
				<DefaultTypeItem 
					contents={contents}/>
			}
			<IndicatorLatestTime 
				date={new Date()} />
		</div>
	)
}
export default CardContents;