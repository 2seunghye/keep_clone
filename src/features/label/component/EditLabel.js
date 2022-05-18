import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { selectLabels } from "features/label/labelSlice";
import CreateBox from "features/label/component/CreateBox";
import useEditLabel from "customHooks/useEditLabel";
import Heading from "features/global/component/Heading";
// 라벨 수정 컴포넌트 정의
/*
	1. 새 라벨 만들기
		Tree : item > ( "activate" button + (label > input) + "create" button )
		flow :
		- click "activate" => active item  => 
			"activate" button change to "cancel" button / 
			focus input / 
			visible "create" button => 
				A click "create" or press enter key => [to store...] => add label => deactive item / reset input
				B click "cancel" or press esc key => deactive item / reset input 
				C focus other item => deactive item / reset input
	2. 기존 라벨 수정
		Tree : item > ( "delete" button + (label > input) + "activate edit mode" button + "push" button )
		flow : 
		- focus input or click "activate edit mode" => active item => edit label name => 
			A click "push" or press enter key => [to store...] => update label => deactive item
			B press esc key => deactive item / restore input value 
			C focus other item => deactive item

	3. 완료 - 닫기 
		Tree : area > "done" button
		flow : 
		- click "done" button => 
			A nothing diff any label name => close popup
			B if diff label name => [to store...] => close popup
	4. 전역(popup interface)
		press esc key or focusout popup(include children) => close popup
		loop focus, if has showing popup
*/

const button = {
	"activate" : "",
	"create" : "",
	"delete" : "",
	"cancel" : "",
	"push" : "",
	"activate edit" : "",
	"done" : "",
}


const LabelItem = ({label}) => {
	// item activate
	const initial_set_active = false;
	const [active, setActive] = useState(initial_set_active);
	// input label name
	const {input, onChange, onRestore, onUpdate, onDelete} = useEditLabel(label);
	const signature = `label_${label.id}`;

	const onActive = (event)=>{
		console.group("active");
		console.log(event);
		console.groupEnd("active");
		setActive(true);
	};
	
	const onDeactive = (event)=>{
		console.group("deactive");
		console.log(event);
		console.groupEnd("deactive");
		setActive(false);
	};
	
	const onKeydown = (event)=>{
		if(event.key === "Escape"){
			onDeactive();
			onRestore();
			return false;
		};
		if(event.key !== "Enter") return false;
		// to store 
		const will_update_text = event.target.value;
		onUpdate(will_update_text);
		// next
		onDeactive();
	}
	const onChangeName = ()=> onUpdate(input);

	return (
		<div className="label-item">
			<button type="button" onClick={onDelete}>
				<i className={active ? "ui" : "jkl"}></i>
				<span>라벨 삭제</span>
			</button>
			<label htmlFor={signature}>
				<input 
					type="text" 
					id={signature} 
					value={input}
					onChange={onChange}
					onFocus={onActive}
					onKeyDown={onKeydown}
				/>
			</label>
			<button type="button" onClick={active ? onChangeName : onActive}>
				<i className={active ? "aaa" : "bvc"}></i>
				<span>라벨 이름 바꾸기</span>
			</button>
		</div>
	);
};

const EditLabel = () => {
	const labelState = useSelector(selectLabels);
	const focus_input = useRef();
	const handler = useCallback(
		(event)=>{
			console.group("label:event");
			// console.log(event.currentTarget);
			console.log(event.target);
			console.log(0, focus_input.current);
			
			if(event.target instanceof HTMLInputElement && focus_input.current !== event.target) 
			{
				(focus_input.current = event.target);
				console.log(1, focus_input.current);
				console.groupEnd("label:event");
				return;
			}
			console.groupEnd("label:event");

		},
		[focus_input]
	)
	// useLayoutEffect(
	// 	()=>{
	// 		const el = document.querySelector(".edit-label-wrap");
	// 		el.addEventListener("keydown", handler, false);
	// 	},
	// 	[handler]
	// )
	return (
		<div className="edit-label-wrap">
			<Heading level={"h3"} headcopy={"라벨 수정"} /> 
			{/* 새 라벨 만들기 */}
			<CreateBox/>
			{/* 기존 라벨 목록 */}
			{labelState.map( label => <LabelItem key={label.id} label={label}/>)}
		</div>
	);
};

export default EditLabel;