import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update_item } from "../../Redux/Actions/memo";
import styled, { css } from "styled-components";
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

function ListItem({ id, isChecked, text, listId  }){
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const onUpdate = () => {
		const payload = {
			id,
			text
		}
		const action = update_item(payload);
		dispatch(action);
		setIsEditing(false);
	};
	return (
		<StyledListItem isChecked={isChecked}>
			{isEditing ? (
				<UpdateBox type={"checkbox"} id={id} listId={listId} text={text} isChecked={isChecked} onUpdate={onUpdate} />
				) : (
				<ReadBox type={"checkbox"} id={id} listId={listId} text={text} isChecked={isChecked} setIsEditing={setIsEditing} />
			)}
		</StyledListItem>
	);
};

const Contents = ({ listId, contents, useCheckbox }) => {
	return (
		<StyledCheckBoxList>
			<StyledUnorderedList>
				{contents.map((item, index) => 
					<ListItem
						key={index}
						listId={listId}
						useCheckbox={useCheckbox}
						text={item.text}
						id={item.id} 
					/>
				)}
			</StyledUnorderedList>
			<LabelBox listId={listId} />
		</StyledCheckBoxList>
	);
};

export default Contents;
