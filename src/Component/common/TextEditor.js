import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import styled from "styled-components";
// custom hook
import usePlaceholder from "../../customHooks/usePlaceholder";
import { selectEditorTextStatus, updateEditorStatus } from "../../module/newMemo";
// component:styled
const Wrapper = styled.div`
	position:relative;
	line-height:1.35em;
`; 
const Placeholder = styled.div`
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	display: ${(props)=>props.appearance ? "block" : "none"}
`;
const EditorElement = styled.div`
	position:relative;
	background-color:transparent;
`;
function Editor({contents = []}){
	// console.log("rendering check : content item default");
	const to_text = contents.map(content => content.text).join("\n\n");
	const parse_text = to_text.replaceAll(/(\n)\s/g, "<br/>")
	return(
		<EditorElement 
			contentEditable="true" 
			spellCheck="true"
			onBlur={()=>{}}
		>
			{parse_text}		
		</EditorElement>
	);
}
// component
function TextEditor({memoId, placeholderText, className, eventCallback}){
	const [appearance, onInputTyping] = usePlaceholder(true);
	const link_id = nanoid();
	return(
		<Wrapper className={className}>
			<Placeholder 
				id={link_id}
				appearance={appearance}
			>
				{placeholderText}
			</Placeholder>
			<Editor
				className="editor"
				contentEditable="true"
				spellCheck="true"
				role="textbox"
				tabIndex="0"
				aria-labelledby={link_id}
				onInput={(event)=>{
					eventCallback?.onInput(event);
					onInputTyping(event);
				}}
				onClick={eventCallback?.onClick}
			/>
		</Wrapper>
	);
}

export default TextEditor;