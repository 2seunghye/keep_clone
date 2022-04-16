import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import label, { selectLabel } from "../../module/label";
import { delete_label_in_card } from "../../module/memo/action";
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

const ListItem = ({ text, deleteLabelInMemo }) => {
	const onClick = () => {
		deleteLabelInMemo(text);
	};

	return (
		<StyledListItem>
			<ReadBox text={text} />
			<StyledRemoveButton aria-label="Remove" onClick={onClick}></StyledRemoveButton>
		</StyledListItem>
	);
};

const LabelList = ({ labels, deleteLabelInMemo }) => {
	const labelList = labels.map((item, index) => <ListItem key={index} text={item.text} id={item.id} deleteLabelInMemo={deleteLabelInMemo} />);

	return <StyledListBox>{labelList}</StyledListBox>;
};

export default LabelList;
