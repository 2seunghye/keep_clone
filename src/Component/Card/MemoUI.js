import React from "react";
import styled from "styled-components";
// toolkit
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
// module
import { updateMemo, deleteMemo, copyMemo } from "../../module/memo";
// component:called
import BackgroundColorPicker from "./BackgroundColorPicker";
// component:styled
const UIButton = styled.button`
	cursor: pointer;
	border: none;
	padding: 7px 13px;
	text-align: left;
	font-size: 14px;
	color: ${(props) => (props.darkmode ? "#fff" : "#333")};
	background-color: ${(props) => (props.darkmode ? "#333" : "#fff")};
	&:hover {
		background-color: #888;
	}
`;
// component
function MemoUI({ memo }) {
	const dispatch = useDispatch();
	const onCopy = () => {
		const payload = {
			...memo,
			id: nanoid(),
			isFixed: false,
		};
		const action = copyMemo(payload);
		dispatch(action);
	};
	const onRemove = () => {
		const payload = {
			id: memo.id,
		};
		const action = deleteMemo(payload);
		dispatch(action);
	};
	const onUseCheckbox = () => {
		const payload = {
			...memo,
			useCheckbox: true,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const onUnuseCheckbox = () => {
		const payload = {
			...memo,
			useCheckbox: false,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const onInactive = () => {
		const payload = {
			...memo,
			isActive: false,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const onChoiceColor = (event) => {
		const payload = {
			...memo,
			bgColor: event.target.dataset.color,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};

	const memo_ui_list = [
		{
			name: "메모 삭제",
			interaction: onRemove,
		},
		{
			name: "라벨 추가",
			interaction: () => {},
		},
		{
			name: "그림 추가",
			interaction: () => {},
		},
		{
			name: "사본 만들기",
			interaction: onCopy,
		},
		{
			name: "체크박스 표시",
			interaction: onUseCheckbox,
		},
		{
			name: "체크박스 숨기기",
			interaction: onUnuseCheckbox,
		},
		{
			name: "Google Docs로 복사",
			interaction: () => {},
		},
	];
	return (
		<>
			<BackgroundColorPicker dispatchColor={onChoiceColor} />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{memo_ui_list.map(({ name, interaction }) => (
					<UIButton key={name} type="button" darkmode onClick={interaction}>
						{name}
					</UIButton>
				))}
			</div>
			{memo.isActive && (
				<UIButton onClick={onInactive} darkmode>
					닫기
				</UIButton>
			)}
		</>
	);
}

export default MemoUI;
