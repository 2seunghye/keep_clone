import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const UpdateBox = ({ text, setIsActive }) => {
	const labelState = useSelector((state) => state.labelFetch);

	const dispatch = useDispatch();
	const initial_text = text;
	const [input, setInput] = useState(initial_text);

	const onUpdate = (prev, cur) => {
		let searchId;
		labelState.forEach((item) => {
			console.log(item.text == prev, item.text, prev, item.id);
			if (item.text == prev) {
				searchId = item.id;
			}
		});

		setIsActive(false);
		dispatch(update_label({ id: searchId, text: cur }));
		dispatch(update_label_in_card({ id: searchId, text: cur }));
	};

	return (
		<StyledUpdateBox>
			<input onChange={(e) => setInput(e.target.value)} value={input} />
			<button onClick={() => onUpdate(initial_text, input)}>수정</button>
		</StyledUpdateBox>
	);
};

export default UpdateBox;
