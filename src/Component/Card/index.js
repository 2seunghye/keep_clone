import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// module
import { 
	copy_card, 
	delete_card, 
	change_background_color,
	create_item,
	toggle_fixed_status
} from "../../Redux/Actions/memo";
// call component
import Heading from "../common/Heading";
import MemoInput from "./MemoInput";
import List from "./List";
import FixedButton from "./FixedButton";
import BackgroundColorPicker from "./BackgroundColorPicker";
// styled component
const CardInner = styled.div`
	background: ${(props) => props.color || "#fff"};
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;
const UIButton = styled.button`
	color : ${props => props.isPrimary ? "white" : "black"}
	background-color : ${props => props.isPrimary ? "steelblue" : "ivory"}
`;

// component
function MemoUIGroup({memo}){
	const {id} = memo;
	const dispatch = useDispatch();
	const deleteMemo = (_id) => () => dispatch(delete_card(_id));
	const copyMemo = (_data) => () => dispatch(copy_card(_data));
	return(
		<>
			<UIButton type="button" isPrimary={false} onClick={deleteMemo(id)}>카드 삭제</UIButton>
			<UIButton type="button" isPrimary={true} onClick={copyMemo(memo)}>사본 만들기</UIButton>
		</>
	)
}

function Card({card_data}){
	const {contents, listId, bgColor, isFixed, useCheckbox} = card_data;
	const dispatch = useDispatch();
	const onChoiceColor = (color) => {
		const payload = { bgColor: color };
		const action = change_background_color(listId, payload);
		dispatch(action);
	};
	const onToggleFixed = () => {
		const payload = listId;
		const action = toggle_fixed_status(payload);
		dispatch(action);
	};
	const memoMaker = (_input, _setInput) => (_event) => {
		// escape
		if (!_event.key === "Enter") return false;
		if (_input === "") return false;
		const payload = {
			listId,
			text : _input 
		};
		const action = create_item(payload);
		dispatch(action);
		_setInput("");
	};
	return (
		<CardInner color={bgColor}>
			<Heading 
				level={"h2"} 
				headcopy={"Heading"} />
			<BackgroundColorPicker 
				dispatchColor={onChoiceColor} />
			<FixedButton 
				onToggleFixed={onToggleFixed} 
				isFixed={isFixed} />
			<MemoInput 
				memoMaker={memoMaker} />
			<List
				listId={listId}
				contents={contents}
				useCheckbox={useCheckbox} />
			<MemoUIGroup />
		</CardInner>
	);
};

export default Card;