import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";

const usePlaceholder = (_default)=>{
	const initialState = _default == null ? true : _default;
	const [appearance, setAppearance] = useState(initialState);
	const onInputTyping = (event)=>{
		const check_element = (element)=>element instanceof HTMLInputElement ? element.value : element.innerText; 
		let isEmpty = 1 > check_element(event.target);
		// escape:no change
		console.log("isEmpty : ", isEmpty);
		if(appearance === isEmpty ) return false;
		// if change
		setAppearance(isEmpty);
	}
	return [appearance, onInputTyping];
};

// 동작 정의
/*
	보편적인 상황을 가정하면, 
	링크되어햘 store의 데이터는 parameter로 받아야 함. 
	연결시킨 action 함수 역시 마찬가지.

	동작 정의가 추가될 수 있기 때문에 확장을 고려하면 closure 함수나 클래스로 만드는 것이 적합할 지 모름.

	기본 동작은 
	1.placeholder의 표시 판단 (length > 0)
*/

export const usePlaceholder_with_store = (_id, _selector, _action)=>{
	const selectState = useSelector(_selector(_id));
	const dispatch = useDispatch();
	const onInputTyping = (event)=>{
		const check_element = (element)=>element instanceof HTMLInputElement ? element.value : element.innerText; 
		let isEmpty = 1 > check_element(event.target);
		// escape:no change
		if(selectState === isEmpty ) return false;
		// if change
		const payload = {
			[_id] : isEmpty
		};
		const action = _action(payload); 
		dispatch(action);
	};
	return [
		selectState,
		onInputTyping
	]
}

export default usePlaceholder;