import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
// toolkit
import { nanoid } from "@reduxjs/toolkit";
// component:called
import NavBar from "features/global/NavBar";
import Classfier from "features/memo/component/Classfier";
import { selectLabel } from "features/label/labelSlice";
import { selectMemos, createMemo, deleteMemo, copyMemo, selectMemosupdateMemo } from "features/memo/memoSlice";
import { selectMemoById } from "../features/memo/memoSlice";
// component
function App() {
	const location = useLocation();
	const {state} = location;
	// const tester = new RegExp("^\/(note|list)", "gi");
	console.group("App");
	console.log("location : ", location);
	console.log("state : ", state);
	console.groupEnd("App");
	return (
		<div className="App">
			<Routes location={state?.background_location || location}>
				<Route path="*" element={
					<>
						<NavBar />
						<div className="main">
							<Outlet />
						</div>
					</>
				}>
					<Route index element={<Home />}></Route>
					<Route path="reminders" element={<Reminder />}></Route>
					<Route path="label:labelText" element={<LabelView/>}></Route>
					<Route path="archive" element={<Archive/>}></Route>
					<Route path="trash" element={<Trash/>}></Route>
					<Route path="note/:memoId" element={<Stay />}></Route>
					<Route path="list/:memoId" element={<Stay />}></Route>
				</Route>

			</Routes>

			{/* Popup */}
			{
				state?.background_location &&
				<Routes>
					<Route path="/note/:memoId" element={
						<div>메모 팝업 - noting</div>
					}></Route>
					<Route path="/list/:memoId" element={
						<div>메모 팝업 - checkbox</div>
					}></Route>
				</Routes>
			}

			{/* <Popup keyname={"라벨 수정"} contents={<EditLabel/>} />
			<Popup keyname={"더보기"} contents={<MemoUI keyname={"더보기"} uiList={ui_list_on_tooltip} />}/>
			<Popup keyname={"배경 옵션"} contents={<BackgroundColorPicker />}/> */}
		</div>
	);
}
function Home(){
	const memos = useSelector(selectMemos);
	return(
						<>
							<span>memo creater!</span>
							<Classfier memos={memos}/>
						</>
	)
					
}
function Trash(){
	const memos = useSelector(selectMemos);
	const memos_to_trash = memos.filter(memo => memo.isThrowToCan);
	return(
		<>
						휴지통에 있는 메모는 7일 후에 삭제됩니다.
						휴지통에 메모가 없습니다.
						<Classfier memos={memos_to_trash}/>
					</>
	)
}
function Archive(){
	const memos = useSelector(selectMemos);
	const memos_archive = memos.filter(memo => memo.isKeep);
	return(
		<>
						보관처리된 메모가 여기에 표시됩니다.
						<Classfier memos={memos_archive}/>
					</>
	)
}
function Reminder(){
	const memos = useSelector(selectMemos);
	const memos_remind = memos.filter(memo => memo.useAnnounce);
	return(
		
		<>
			<span>memo creater!</span>
			예정된 알림의 메모가 여기에 표시됩니다.
			<Classfier memos={memos_remind}/>
		</>

	)
}
function Stay(){
	const param = useParams();
	const {memoId} = param;
	console.log("Stay / param :", param);
	const memo = useSelector(selectMemoById(memoId));
	console.log("memo data :", memo);
	const category = ()=>{
		if(memo.isThrowToCan) return <Trash/>
		if(memo.useAnnounce) return <Reminder/>
		if(memo.isKeep) return <Archive/>
		return <Home />
	}
	return(
		category()
	);
}
function LabelView(){
	const memos = useSelector(selectMemos);
	const params = useParams();
	const { memoGroup } = useSelector(selectLabel(params.labelText));
	const memos_by_label = memoGroup.reduce((newList, memoId) => {
		const pick = memos.filter((memo) => memo.id === memoId)[0];
		newList.push(pick);
		return newList;
	}, []);
	return(
		<>
			<span>memo creater!</span>
			<Classfier memos={memos_by_label}/>
		</>
	)
}
export default App;
