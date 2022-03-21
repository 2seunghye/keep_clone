import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { update_label } from "../../Redux/Actions/label";
import { update_label_in_card } from "../../Redux/Actions/memo";

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
`;
const UpdateBox = ({ id, text, index, setIsActive }) => {
	const dispatch = useDispatch();
	const initial_text = text;
	const [input, setInput] = useState(initial_text);

	const onUpdate = (index, _id, _text) => {
		setIsActive(false);
		dispatch(update_label({ id: _id, text: _text }));
		dispatch(update_label_in_card(index, { id: _id, text: _text }));
	};

	return (
		<StyledUpdateBox>
			<input type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
			<button onClick={() => onUpdate(index, id, input)}>수정</button>
		</StyledUpdateBox>
	);
};

export default UpdateBox;
