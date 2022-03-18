import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { delete_label, update_label } from "../../Redux/Actions/label";

const StyledListBox = styled.ul`
	list-style: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
`;

const StyledListItem = styled.li`
	background: #e0e0e0;
	padding: 5px 4px 5px 10px;
	border-radius: 15px;
	font-size: 14px;
`;

const StyledRemoveButton = styled.button`
	display: inline-block;
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
`;
const StyledSpan = styled.span`
	display: inline-block;
`;

const ListItems = ({ id, text }) => {
	const dispatch = useDispatch();
	const initial_text = text;
	const [input, setInput] = useState(initial_text);
	const [isActive, setIsActive] = useState(false);

	const onUpdate = (_id, _text) => {
		setIsActive(false);
		dispatch(update_label({ id: _id, text: _text }));
	};

	return (
		<StyledListItem>
			{isActive ? (
				<StyledUpdateBox>
					<input type={"text"} onChange={(e) => setInput(e.target.value)} value={input} />
					<button onClick={() => onUpdate(id, input)}>수정</button>
				</StyledUpdateBox>
			) : (
				<StyledSpan onDoubleClick={() => setIsActive(true)}>{text}</StyledSpan>
			)}

			<StyledRemoveButton onClick={() => dispatch(delete_label(id))} aria-label="Remove"></StyledRemoveButton>
		</StyledListItem>
	);
};

const LabelList = () => {
	const state = useSelector((state) => state.labelFetch);

	const labelList = state.map((item) => <ListItems key={item.id} id={item.id} text={item.text} />);

	return <StyledListBox>{labelList}</StyledListBox>;
};

export default LabelList;
