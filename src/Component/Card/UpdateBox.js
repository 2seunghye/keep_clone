import React from "react";
import styled from "styled-components";
import useInput from "../../customHooks/useInput";
// styled component
const StyledUpdateBox = styled.div`
	width: 100%;
	display: block;
	input {
		width: 80px;
	}
	button {
		cursor: pointer;
		border: none;
		background: inherit;
		font-weight: 600;
		&:hover {
			text-decoration: underline;
		}
	}
	textarea {
		width: 100%;
		min-height: 100px;
	}
`;
// component
function UpdateBox({ text, onUpdate }){
	const initialValue = text;
	const [input, setInput, onChange] = useInput(initialValue);	
	return (
		<StyledUpdateBox>
			<input type="text" onChange={onChange} value={input} />
			<button onClick={onUpdate}>수정</button>
		</StyledUpdateBox>
	)
};

export default UpdateBox;