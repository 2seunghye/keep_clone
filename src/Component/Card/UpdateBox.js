import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { update_item } from "../../Redux/Actions/memo";

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
const UpdateBox = ({ type, index, id, text, isChecked, setIsEditing }) => {
	const dispatch = useDispatch();

	const [input, setInput] = useState(text);

	const onUpdate = (payload) => {
		dispatch(update_item(index, payload));
		setIsEditing(false);
	};

	const editForm = () => {
		switch (type) {
			case "checkbox":
				return (
					<>
						<input type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
						<button onClick={() => onUpdate({ id: id, text: input, isChecked: isChecked })}>수정</button>
					</>
				);
			case "text":
				return (
					<>
						<textarea type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
						<button onClick={() => onUpdate({ id: id, text: input })}>수정</button>
					</>
				);
			default:
				console.log("default");
		}
	};

	return <StyledUpdateBox>{editForm()}</StyledUpdateBox>;
};

export default UpdateBox;
