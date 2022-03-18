import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { change_checkbox_status, delete_checkbox, delete_item, update_checkbox, update_item } from "../../Redux/Actions/checkbox";
import LabelBox from "../LabelBox";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";

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

const ListItems = ({ id, isChecked, text, index, type }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);

	switch (type) {
		case "checkbox":
			return (
				<StyledListItem isChecked={isChecked}>
					<>
						{isEditing ? (
							<UpdateBox type={"checkbox"} id={id} index={index} text={text} isChecked={isChecked} setIsEditing={setIsEditing} />
						) : (
							<ReadBox type={"checkbox"} id={id} index={index} text={text} isChecked={isChecked} setIsEditing={setIsEditing} />
						)}
					</>
				</StyledListItem>
			);
		case "text":
			return (
				<StyledListItem>
					<>
						{isEditing ? (
							<UpdateBox type={"text"} id={id} index={index} text={text} setIsEditing={setIsEditing} />
						) : (
							<ReadBox type={"text"} id={id} index={index} text={text} setIsEditing={setIsEditing} />
						)}
					</>
				</StyledListItem>
			);
	}
};

const List = ({ index, type }) => {
	const state = useSelector((state) => state.memoFetch);

	const listItems = state[index].listItems.map((item) => {
		return <ListItems type={type} index={index} key={item.id} text={item.text} isChecked={item.isChecked} id={item.id} />;
	});

	return (
		<StyledCheckBoxList>
			<StyledUnorderedList>{listItems}</StyledUnorderedList>
			<LabelBox index={index} />
		</StyledCheckBoxList>
	);
};

export default List;
