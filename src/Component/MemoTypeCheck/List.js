import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { change_checkbox_status, delete_checkbox, delete_item, update_checkbox, update_item } from "../../Redux/Actions/checkbox";
import LabelBox from "./LabelBox/LabelBox";

const StyledCheckBoxList = styled.div`
	padding: 20px 0;
	margin-top: 20px;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
`;

const StyledUnorderedList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	padding: 0;
	margin: 0;
	text-align: left;
`;

const StyledListItem = styled.li`
	${(props) => {
		if (props.isChecked) {
			return css`
				order: 1;
			`;
		} else {
			return css`
				order: 0;
			`;
		}
	}}
	padding: 5px 15px;
	&:hover {
		button {
			display: inline-block;
		}
	}
`;

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

const StyledEditButton = styled.button``;

const ListItems = ({ id, isChecked, text, index, type }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [input, setInput] = useState(text);

	const onUpdate = (index, id, text, isChecked) => {
		dispatch(update_item(index, { id: id, text: text, isChecked: isChecked }));
	};

	switch (type) {
		case "checkbox":
			return (
				<StyledListItem isChecked={isChecked}>
					{isEditing ? (
						<StyledUpdateBox>
							<input type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
							<button onClick={() => onUpdate(index, id, input, isChecked)}>수정</button>
						</StyledUpdateBox>
					) : (
						<>
							<StyledLabel className={isChecked ? "active" : ""} htmlFor={id}>
								{text}
							</StyledLabel>
							<StyledInput type="checkbox" value={text} checked={isChecked} id={id} onChange={() => dispatch(change_checkbox_status(index, id))} />
							<button onClick={() => setIsEditing(true)}>수정</button>
							<StyledRemoveButton onClick={() => dispatch(delete_item(index, parseInt(id)))} aria-label="Remove"></StyledRemoveButton>
						</>
					)}
				</StyledListItem>
			);
		case "text":
			return (
				<StyledListItem>
					{isEditing ? (
						<StyledUpdateBox>
							<textarea type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
							<button onClick={() => onUpdate(index, id, input, isChecked)}>수정</button>
						</StyledUpdateBox>
					) : (
						<>
							<p>{text}</p>
							<StyledInput type="checkbox" value={text} checked={isChecked} id={id} onChange={() => dispatch(change_checkbox_status(index, id))} />
							<button onClick={() => setIsEditing(true)}>수정</button>
							<StyledRemoveButton onClick={() => dispatch(delete_item(index, parseInt(id)))} aria-label="Remove"></StyledRemoveButton>
						</>
					)}
				</StyledListItem>
			);
	}
};

const List = ({ index, type }) => {
	const state = useSelector((state) => state.checkboxFetch);

	const List = () => {
		const listItems = state[index].listItems.map((item) => {
			return <ListItems type={type} index={index} key={item.id} text={item.text} isChecked={item.isChecked} id={item.id} />;
		});

		return <StyledUnorderedList>{listItems}</StyledUnorderedList>;
	};

	return (
		<StyledCheckBoxList>
			<List />
			<LabelBox index={index} />
		</StyledCheckBoxList>
	);
};

export default List;
