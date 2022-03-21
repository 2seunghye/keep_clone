import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { delete_label } from "../../Redux/Actions/label";
import { delete_label_in_all_card } from "../../Redux/Actions/memo";

const StyledSpan = styled.span`
	display: inline-block;
`;
const ReadBox = ({ text, setIsActive }) => {
	const labelState = useSelector((state) => state.labelFetch);
	const dispatch = useDispatch();
	const onDelete = () => {
		let searchId;
		labelState.forEach((item) => {
			if (item.text == text) {
				searchId = item.id;
			}
		});

		setIsActive(false);

		dispatch(delete_label(searchId));
		dispatch(delete_label_in_all_card(searchId));
	};

	return (
		<div>
			<StyledSpan onDoubleClick={() => setIsActive(true)}>{text}</StyledSpan>
			<button onClick={() => setIsActive(true)}>수정</button>
			<button onClick={onDelete}>삭제</button>
		</div>
	);
};

export default ReadBox;
