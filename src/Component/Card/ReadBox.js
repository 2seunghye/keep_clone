import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { change_checkbox_status, delete_item } from "../../Redux/Actions/memo";
const StyledLabel = styled.label`
	display: inline-block;
	position: relative;
	padding-left: 26px;
	cursor: pointer;
	&:hover {
		&:before {
			opacity: 0.95;
		}
	}
	&:before {
		content: "";
		position: absolute;
		left: 0;
		top: 3px;
		width: 16px;
		height: 16px;
		text-align: center;
		background: #fff;
		border: 2px solid #000;
		border-radius: 2px;
		opacity: 0.54;
		box-sizing: border-box;
	}
	&.active {
		&:hover {
			&:after {
				opacity: 0.95;
			}
		}
		&:after {
			content: "✔";
			position: absolute;
			top: 1px;
			left: 3px;
			opacity: 0.54;
			font-size: 14px;
			width: 16px;
			height: 16px;
		}
	}
`;

const StyledInput = styled.input`
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;

const StyledRemoveButton = styled.button`
	display: none;
	opacity: 0.54;
	cursor: pointer;
	width: 22px;
	height: 22px;
	position: relative;
	background: none;
	outline: none;
	border: none;
	float: right;
	&:hover {
		opacity: 0.95;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 50%;
	}
	&.active {
		display: inline-block;
	}
	&:before,
	&:after {
		position: absolute;
		top: 5px;
		left: 10px;
		content: " ";
		height: 12px;
		width: 2px;
		background-color: #000;
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(-45deg);
	}
`;

const ReadBox = ({ type, index, id, text, isChecked, setIsEditing }) => {
	const dispatch = useDispatch();

	const removeBtn = <StyledRemoveButton onClick={() => dispatch(delete_item(index, parseInt(id)))} aria-label="Remove"></StyledRemoveButton>;
	const editBtn = <button onClick={() => setIsEditing(true)}>수정</button>;

	const ButtonBox = () => {
		return (
			<>
				{editBtn}
				{removeBtn}
			</>
		);
	};

	const readForm = () => {
		switch (type) {
			case "checkbox":
				return (
					<>
						<StyledLabel className={isChecked ? "active" : ""} htmlFor={id}>
							{text}
						</StyledLabel>
						<StyledInput type="checkbox" value={text} checked={isChecked} id={id} onChange={() => dispatch(change_checkbox_status(index, id))} />
						<ButtonBox />
					</>
				);
			case "text":
				return (
					<>
						<p>{text}</p>
						<ButtonBox />
					</>
				);
			default:
				console.log("default");
		}
	};

	return <>{readForm()}</>;
};

export default ReadBox;
