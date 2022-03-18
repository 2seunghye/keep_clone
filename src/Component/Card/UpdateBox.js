import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { update_item } from "../../Redux/Actions/checkbox";

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
const UpdateBox = ({ type, index, id, text, isChecked }) => {
	const dispatch = useDispatch();

	const [input, setInput] = useState(text);

	const onUpdate = (input) => {
		switch (type) {
			case "checkbox":
				return dispatch(update_item(index, { id: id, text: input, isChecked: isChecked }));
			case "text":
				return dispatch(update_item(index, { id: id, text: input }));
		}
	};

	const editForm = () => {
		switch (type) {
			case "checkbox":
				return (
					<>
						<input type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
						<button onClick={() => onUpdate(input)}>수정</button>
					</>
				);
			case "text":
				return (
					<>
						<textarea type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
						<button onClick={() => onUpdate(input)}>수정</button>
					</>
				);
		}
	};

	return <StyledUpdateBox>{editForm()}</StyledUpdateBox>;
};

export default UpdateBox;
