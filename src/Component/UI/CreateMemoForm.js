import React from "react";
import { useDispatch } from "react-redux";
import { create_check_card, create_text_card } from "../../module/memo/action";

const CreateMemoForm = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<button onClick={() => dispatch(create_check_card())}>체크박스 추가</button>
			<button onClick={() => dispatch(create_text_card())}>텍스트 추가</button>
		</div>
	);
};

export default CreateMemoForm;
