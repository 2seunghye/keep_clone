import React, { useState } from "react";
import styled from "styled-components";
// styled component
const StyledInputBox = styled.div`
	width: 100%;
	display: flex;
	gap: 15px;
`;
const StyledInput = styled.input`
	flex: 5;
	width: 100%;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 5px;
`;

// component
function MemoInput({memoMaker}){
	const [input, setInput] = useState("");
	const onKeyPressEnter = memoMaker(input, setInput);
	const onChange = (e) => setInput(e.target.value);
	return (
		<StyledInputBox>
			<StyledInput
				value={input}
				onChange={onChange}
				onKeyPress={onKeyPressEnter}
				placeholder={"메모 작성..."}
				required
			/>
		</StyledInputBox>
	);
};

export default MemoInput;
