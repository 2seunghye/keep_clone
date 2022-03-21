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

	const useConfirm = (message, onConfirm, onCancel) => {
		const confirmAction = () => {
			if (window.confirm(message)) {
				onConfirm();
			} else {
				onCancel();
			}
		};

		return confirmAction;
	};

	const deleteConfirm = () => {
		let searchId;
		labelState.forEach((item) => {
			if (item.text == text) {
				searchId = item.id;
			}
		});

		setIsActive(false);

		dispatch(delete_label(searchId));
		dispatch(delete_label_in_all_card(searchId));

		console.log("삭제완료");
	};

	const cancelConfirm = () => {
		console.log("삭제취소");
	};

	const confirmDelete = useConfirm("이 라벨을 삭제하고 모든 메모에서 삭제합니다. 메모는 삭제되지 않습니다.", deleteConfirm, cancelConfirm);

	return (
		<div>
			<StyledSpan>{text}</StyledSpan>
			<button onClick={() => setIsActive(true)}>수정</button>
			<button onClick={confirmDelete}>삭제</button>
		</div>
	);
};

export default ReadBox;
