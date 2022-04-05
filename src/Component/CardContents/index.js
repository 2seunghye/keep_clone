import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";
import { delete_item } from "../../module/memo/action";
import { update_item } from "../../module/memo/action";
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
	return(
		<Item key={id}>
			<div 
				contentEditable="true" 
				spellCheck="true"
				onBlur={updateContentText}
				// onBlurCapture={(event)=>{console.log("onBlurCapture :",event)}}
			>
				{text}		
			</div>
		</Item>
	);
}
function ContentItem({content, useCheckbox}){
	const {id, text, isChecked} = content;
	const dispatch = useDispatch();
	const deleteContent = (_id) => {
		const payload = {id};
		const action = delete_item(payload);
		dispatch(action);
	};
	const updateContentText = (event) => {
		// 값을 바꾸지 않은 경우 
		if(text === event.target.innerText) return false;
		// 내용을 모두 지운 경우
		if(0 >= event.target.innerText.length) return deleteContent(id);
		
		console.group("Which true value on contenteditable element");
		console.log("value :", event.target.value);
		console.log("innerText :", event.target.innerText);
		console.groupEnd("Which true value on contenteditable element");

		const payload = ()=>{
			if(useCheckbox){
				return {
					id,
					text : event.target.innerText,
					isChecked
				};
			}
			return {
				id,
				text : event.target.innerText,
			};
		}
		


		const action = update_item(id, payload);
		dispatch(action);
	};
	const toggleChecked = (event) => {
		// ...
		console.log(event);
		console.log("checked : ", event.target.checked);
	}
	// case:checkbox
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
};

export default ContentItem;