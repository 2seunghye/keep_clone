import React from "react";
import styled from "styled-components";
// from label
import useEditLabel from "customHooks/useEditLabel";

const StyledAddLabelForm = styled.div`
	display: flex;
	gap: 15px;
`;

const StyledInput = styled.input`
	flex: 5;
	width: 100%;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
`;

const StyledButton = styled.button`
	flex: 1;
	width: 100%;
	cursor: pointer;
	padding: 12px 16px;
	box-sizing: border-box;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
`;

const CreateBox = () => {
	const initial_text = ""
	const {input, onChange, onCreate, onRestore} = useEditLabel({
		id : null,
		text : initial_text,
		memoGroup : []
	});
	const onKeyDown = (event) => {
		if (event.key === "Escape") return onRestore();
		if (event.key !== "Enter") return false;
		onCreate(input);
	};
	return (
		<StyledAddLabelForm>
			<StyledInput 
				value={input} 
				onChange={onChange} 
				onKeyDown={onKeyDown} 
				placeholder={"새 라벨 만들기"}
			/>
			<StyledButton
				onClick={() => onCreate(input)}
			>
				추가
			</StyledButton>
		</StyledAddLabelForm>
	);
};

export default CreateBox;
