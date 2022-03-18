import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { delete_label_in_card, update_label_in_card } from "../../Redux/Actions/checkbox";
import { delete_label, update_label } from "../../Redux/Actions/label";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";

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

const ListItems = ({ id, text, index }) => {
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState(false);

	return (
		<StyledListItem>
			{isActive ? <UpdateBox id={id} text={text} index={index} setIsActive={setIsActive} /> : <ReadBox text={text} setIsActive={setIsActive} />}
			<StyledRemoveButton onClick={() => dispatch(delete_label_in_card(index, id))} aria-label="Remove"></StyledRemoveButton>
		</StyledListItem>
	);
};

const LabelList = ({ index }) => {
	const state = useSelector((state) => state.memoFetch);

	const labelList = state[index].listLabels.map((item, index) => <ListItems index={index} key={index} id={item.id} text={item.text} />);

	return <StyledListBox>{labelList}</StyledListBox>;
};

export default LabelList;
