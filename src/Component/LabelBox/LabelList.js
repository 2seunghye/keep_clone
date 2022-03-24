import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { delete_label_in_card } from "../../Redux/Actions/memo";
import ReadBox from "./ReadBox";

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

const ListItem = ({ id, text, listId }) => {
	const dispatch = useDispatch();

	return (
		<StyledListItem>
			<ReadBox text={text} />
			<StyledRemoveButton onClick={() => dispatch(delete_label_in_card(listId, id))} aria-label="Remove"></StyledRemoveButton>
		</StyledListItem>
	);
};

const LabelList = ({ listId }) => {
	const memoState = useSelector((state) => state.memoFetch);

	let target;

	memoState.forEach((item) => {
		if (item.listId == listId) {
			target = item.labels;
		}
	});

	const labelList = target.map((item) => <ListItem listId={listId} key={item.id} id={item.id} text={item.text} />);

	return <StyledListBox>{labelList}</StyledListBox>;
};

export default LabelList;
