import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import styled from "styled-components";
// custom hook
import usePlaceholder from "../../customHooks/usePlaceholder";

// component:styled
const Wrapper = styled.div`
	position:relative;
	line-height:1.35em;
	.editor {
		position:relative;
		background-color:transparent;
	}
`; 
const Placeholder = styled.div`
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	display: ${(props)=>props.appearance ? "block" : "none"}
`;
// component
function TextEditor({memoId, pretext, placeholderText, className, eventCallback}){
	console.log("pretext :", pretext, typeof pretext, pretext instanceof String);
	const flag = 1 > pretext.length;
	const [appearance, onInputTyping] = usePlaceholder(flag);
	const link_id = nanoid();
	return(
		<Wrapper className={className}>
			<Placeholder 
				id={link_id}
				appearance={appearance}
			>
				{placeholderText}
			</Placeholder>
			<div
				className="editor"
				contentEditable="true"
				spellCheck="true"
				role="textbox"
				tabIndex="0"
				aria-labelledby={link_id}
				onInput={(event)=>{
					onInputTyping(event);
					eventCallback?.onInput(event);
				}}
				onClick={(event)=>{
					eventCallback?.onClick(event);
				}}
			>
				{pretext}		
			</div>
		</Wrapper>
	);
};

export default TextEditor;