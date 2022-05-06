import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
// 
import { Route, Routes } from "react-router-dom";
import HomeView from "./View/HomeView";
import LabelView from "./View/LabelView";
import ShowMemoWithLabel from "./Component/ShowMemoWithLabel";

// toolkit
import { nanoid } from "@reduxjs/toolkit";
import { createMemo, updateMemo, deleteMemo, copyMemo, selectMemos } from "./module/memo";
// component:called
import NavBar from "./route/NavBar";
import Popup from "./Component/common/Popup";
import BackgroundColorPicker from "./Component/Card/BackgroundColorPicker";
import MemoUI from "./Component/Card/MemoUI";
import EditLabel from "./Component/EditLabel";
// component
function App() {
	const dispatch = useDispatch();
	const onCopy = (memo) => {
		const payload = {
			...memo,
			id: nanoid(),
			isFixed: false,
		};
		const action = copyMemo(payload);
		dispatch(action);
	};
	const onRemove = (memo) => {
		const payload = {
			id: memo.id,
		};
		const action = deleteMemo(payload);
		dispatch(action);
	};
	const onUseCheckbox = (memo) => {
		const payload = {
			...memo,
			useCheckbox: true,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	const onUnuseCheckbox = (memo) => {
		const payload = {
			...memo,
			useCheckbox: false,
		};
		const action = updateMemo(payload);
		dispatch(action);
	};
	
	const ui_list_on_tooltip = [
		{
			name: "메모 삭제",
			interaction: onRemove,
		},
		{
			name: "라벨 추가",
			interaction: ()=>{},
		},
		{
			name: "라벨 변경",
			interaction: ()=>{},
		},
		{
			name: "그림 추가",
			interaction: () => {
				// canvas 호출
			},
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
		<div className="App">
			<NavBar />
			<Routes>
				{/* router.js를 app.js로 이관 */}
				<Route index element={<HomeView />}></Route>
				<Route path="/reminders" element={<HomeView />}></Route>
				<Route path="/label" element={<LabelView />}>
					<Route path=":labelText" element={<ShowMemoWithLabel />} />
				</Route>
				<Route path="/archive" element={<>보관 처리</>}></Route>
				<Route path="/trash" element={<>휴지통</>}></Route>
			</Routes>
			{/* Popup */}
			<Routes>
				<Route path="note/:memoId" element={
					<div>메모 팝업</div>
				}></Route>
			</Routes>
			<Popup keyname={"라벨 수정"} contents={<EditLabel/>} />
			<Popup keyname={"더보기"} contents={<MemoUI keyname={"더보기"} uiList={ui_list_on_tooltip} />}/>
			<Popup keyname={"배경 옵션"} contents={<BackgroundColorPicker />}/>
		</div>
	);
}

export default App;
