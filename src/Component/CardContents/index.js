import React from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeContents, selectContentsById, updateContents, updateSingleContent } from "../../module/memoContents";
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

`;

function CheckboxTypeItem({id, text, updateContentText, isChecked, toggleChecked}){
	return(
		<Item key={id}>
			<input 
				id={id}
				type="checkbox" 
				checked={isChecked}
				onChange={toggleChecked}
			/>
			<label htmlFor={id}></label>
			<div 
				contentEditable="true" 
				spellCheck="true"
				onBlur={updateContentText}
				onKeyDown={(event)=>{
					if(event.key === "Enter") return false;
					console.log("enter key!");
					updateContentText(event);
				}}
				// onBlurCapture={(event)=>{console.log("onBlurCapture :",event)}}
			>
				{text}		
			</div>
			<button type="button">
				<Icon />
				<span>{"Delete"}</span>
			</button>
		</Item>
	);
}
function DefaultTypeItem({id, text, updateContentText}){
	const parse_text = text.replaceAll(/(\n)\s/g, "<br/>")
	return(
		<Item key={id}>
			<div 
				contentEditable="true" 
				spellCheck="true"
				onBlur={updateContentText}
				// onBlurCapture={(event)=>{console.log("onBlurCapture :",event)}}
			>
				{parse_text}		
			</div>
		</Item>
	);
}
function CardContents({className, memoId, useCheckbox}){
	const contents = useSelector(selectContentsById(memoId));	
	console.log(4001);
	return(
		<div className={className}>
			{0 >= contents.length && <div>{"메모 작성..."}</div>}
			{contents.map((content) => (
				<ContentItem 
					key={content.id}
					memoId={memoId}
					content={content}
					useCheckbox={useCheckbox}
				/>
			))}
			<div className="latest-modified-time">{`수정된 시간: ${new Date().getMonth() + 1}월 ${new Date().getDate()}일`}</div>
		</div>
	);
}
function ContentItem({memoId, content, useCheckbox}){
	console.log(4001123);
	const {id, text, isChecked} = content;
	const dispatch = useDispatch();
	const updateContentText = (event) => {
		// 값을 바꾸지 않은 경우 
		if(text === event.target.innerText) return false;
		// 내용을 모두 지운 경우
		// if(0 >= event.target.innerText.length) return deleteContent(id);
		console.group("Which true value on contenteditable element");
		console.log("value :", event.target.value);
		console.log("innerText :", event.target.innerText);
		console.groupEnd("Which true value on contenteditable element");
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
		console.log(1231, isChecked);
		const payload = {
			...content,
			isChecked : !isChecked
		};
		console.log(546, payload.isChecked)
		const action = Object.assign(
			updateSingleContent(payload), 
			{memoId}
		);
		dispatch(action);
	};
	if(useCheckbox) 
	return <CheckboxTypeItem 
		id={id}
		text={text}
		isChecked={isChecked}
		toggleChecked={toggleChecked}
		updateContentText={updateContentText}
	/>
	// case:default
	return <DefaultTypeItem 
		id={id}
		text={text}
		updateContentText={updateContentText}
	/>
}
export default CardContents;