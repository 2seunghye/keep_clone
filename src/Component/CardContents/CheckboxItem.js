import React from "react";
import Styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateSingleContent, removeSingleContent } from "../../module/memoContents";
// component:styled
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
// component
function CheckboxItem({memoId, content}){
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
export default CheckboxItem;