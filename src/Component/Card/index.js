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
} from "../../module/memo/action";
// called component
import Heading from "../common/Heading";
import MemoInput from "./MemoInput";
import Contents from "./Contents";
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
function MemoCard({singleMemoData}){
	const {contents, listId, bgColor, isFixed, useCheckbox} = singleMemoData;
	const dispatch = useDispatch();
	// state updator function
	// update memo bg color
	const onChoiceColor = (color) => {
		const payload = { bgColor: color };
		const action = change_background_color(listId, payload);
		dispatch(action);
	};
	// update memo status:hang on top
	const onToggleFixed = () => {
		const payload = listId;
		const action = toggle_fixed_status(payload);
		dispatch(action);
	};
	// add new memo
	const memoMaker = (_input, _setInput) => (event) => {
		// escape
		if (!event.key === "Enter") return false;
		if (_input === "") return false;
		const payload = {
			listId,
			text : _input 
		};
		const action = create_item(payload);
		dispatch(action);
		// reset input value
		_setInput("");
	};
	return (
		<CardInner color={bgColor}>
			<Heading 
				level={"h2"} 
				headcopy={"Memo"} />
			<BackgroundColorPicker 
				dispatchColor={onChoiceColor} />
			<FixedButton 
				onToggleFixed={onToggleFixed} 
				isFixed={isFixed} />
			<MemoInput 
				memoMaker={memoMaker} />
			<Contents
				// listId={listId}
				contents={contents}
				useCheckbox={useCheckbox} />
			{/* <MemoUIGroup memo={singleMemoData} /> */}
		</CardInner>
	);
};

export default MemoCard;