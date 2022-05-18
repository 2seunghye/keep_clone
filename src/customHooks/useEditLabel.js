import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectLabels, createLabel, deleteLabel, updateLabel } from "features/label/labelSlice";
import useInput from "customHooks/useInput";
import message from "common/message";
import { useNavigate } from "react-router-dom";

const useEditLabel = (label) => {
	const {id , text} = label;
	const [input, setInput, onChange, onRestore] = useInput(text);
	const dispatch = useDispatch();
	const labelState = useSelector(selectLabels);
	const navigate = useNavigate();
	// util:check label text
	const already_has_label = (_input_text) => {		
		for (let i = 0; i < labelState.length; ++i) {
			if (labelState[i].text === _input_text){
				alert(message["already"]);
				return true;
			}
		}
		return false;
	};

	const onCreate = (_input_text)=>{
		if (0 >= _input_text.length) return;
		// check same label name to the state
		if (already_has_label(_input_text)) return;
		// to store
		const payload = {
			id: nanoid(),
			text: _input_text,
			memoGroup: [],
		};
		const action = createLabel(payload);
		dispatch(action);
		// next
		// restoration
		onRestore();
	};
	
	const onUpdate = (_will_update_text)=>{
		// if reduce name to zero
		if (0 >= input.length){
			window.confirm(message["empty"]) ? 
			onDelete() :
			onRestore();
		};
		// if not change 
		if (text === _will_update_text) return;
		const payload = {
			...label,
			text : _will_update_text,
		}

		const action = updateLabel(payload);
		dispatch(action);
		// next 
		// relocation 
		navigate(`/label/${_will_update_text}`, {replace : true});
	};
	
	const onDelete = () => {
		const isConfirm = window.confirm(message["delete"]);
		if(!isConfirm) return console.log("삭제취소");
		console.log("삭제완료");
		// to store
		const payload = { id };
		const action = deleteLabel(payload);
		dispatch(action);
		// next 
		// relocation 
		navigate("/");
	};

	return {
		input, 
		setInput,
		onChange,
		onRestore,
		onCreate,
		onUpdate,
		onDelete,
	};
};

export default useEditLabel;