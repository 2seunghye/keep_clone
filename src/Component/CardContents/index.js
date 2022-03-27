import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";
import { update_item } from "../../Redux/Actions/memo";
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

// function CheckboxTypeItem({id, text, isChecked}){
// 	const updateContent = (event)=>{
// 		// 값을 바꾸지 않은 경우 
// 		if(text === event.target.innerText) return false;
// 		// 내용을 모두 지운 경우
// 		if(0 >= event.target.innerText.length) return false;
// 		console.log("value :", event.target.value);
// 		console.log("innerText :", event.target.innerText);
// 		const payload = {
// 			id,
// 			text : event.target.innerText,
// 			isChecked
// 		};
// 		const action = update_item(dataAccessKey, payload);
// 		dispatch(action);
// 	};
// 	return(
// 		<Item key={id}>
// 			<input 
// 				type="checkbox" 
// 				checked={isChecked}
// 			/>
// 			<div 
// 				contentEditable="true" 
// 				spellCheck="true"
// 				onBlur={updateContent}
// 				// onBlurCapture={(event)=>{console.log("onBlurCapture :",event)}}
// 			>
// 				{text}		
// 			</div>
// 			<button type="button">
// 				<Icon />
// 				<span>{"Delete"}</span>
// 			</button>
// 		</Item>
// 	);
// }
// function DefaultTypeItem({id, text, updateContent}){
// 	return(
// 		<Item key={id}>
// 			<div 
// 				contentEditable="true" 
// 				spellCheck="true"
// 				onBlur={updateContent}
// 				// onBlurCapture={(event)=>{console.log("onBlurCapture :",event)}}
// 			>
// 				{text}		
// 			</div>
// 		</Item>
// 	);
// }
function ContentEditor({dataAccessKey}){
	const contentState = useSelector( state => state.memoFetch.filter(memo => memo.listId == dataAccessKey) );
	console.log("ContentsEditor :", contentState);
	const {contents, useCheckbox} = contentState;
	const dispatch = useDispatch();
	
	return (
		<></>
	)
};

export default ContentEditor;