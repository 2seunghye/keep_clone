import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { update_label } from "../../module/label/action";
import { update_label_in_all_card, UPDATE_LABEL_IN_ALL_CARD } from "../../module/memo/action";

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

const UpdateBox = ({ text, setIsActive }) => {
	const labelState = useSelector((state) => state.labelFetch);

	const dispatch = useDispatch();
	const initial_text = text;
	const [input, setInput] = useState(initial_text);

	const hasLabelInLabelList = (_text) => {
		let result = null;
		for (let i = 0; i < labelState.length; ++i) {
			if (labelState[i].text === _text) {
				result = true;
				break;
			}
			result = false;
		}
		return result;
	};

	const onUpdate = (prev, cur) => {
		if (!hasLabelInLabelList(cur)) {
			let searchId;
			labelState.forEach((item) => {
				console.log(item.text == prev, item.text, prev, item.id);
				if (item.text == prev) {
					searchId = item.id;
				}
			});

			setIsActive(false);
			dispatch(update_label({ id: searchId, text: cur }));
			dispatch(update_label_in_all_card({ id: searchId, text: cur }));
		} else {
			alert("이미 존재하는 라벨명입니다!");
		}
	};

	return (
		<StyledUpdateBox>
			<input onChange={(e) => setInput(e.target.value)} value={input} />
			<button onClick={() => onUpdate(initial_text, input)}>수정</button>
			<button onClick={() => setIsActive(false)}>취소</button>
		</StyledUpdateBox>
	);
};

export default UpdateBox;
