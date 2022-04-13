import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import label, { deleteLabel, selectLabel } from "../../module/label";
import { delete_label } from "../../module/label/action";
import { delete_label_in_all_card } from "../../module/memo/action";

const StyledSpan = styled.span`
	display: inline-block;
`;

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

const ReadBox = ({ text, setIsActive }) => {
	const labelState = useSelector(selectLabel);
	const dispatch = useDispatch();

	let labelId = null;

	labelState.forEach((item) => {
		if (item.text == text) {
			labelId = item.id;
			return;
		}
	});

	const deleteConfirm = () => {
		const payload = { id: labelId };
		const action = deleteLabel(payload);
		dispatch(action);

		setIsActive(false);

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
