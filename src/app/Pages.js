import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectLabel, selectLabels } from "features/label/labelSlice";
import { selectMemos, selectMemoById } from "../features/memo/memoSlice";
import Classfier from "features/memo/component/Classfier";

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
function DirectMemo(){
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
function Labels(){
	const memos = useSelector(selectMemos);
	const params = useParams();
	console.group("Labels");
	console.log(params.labelText);
	console.log(useSelector(selectLabels));
	console.log(selectLabel(params.labelText));
	console.log(useSelector(selectLabel(params.labelText)));
	console.groupEnd("Labels");
	const selected_label = useSelector(selectLabel(params.labelText));
	const memos_by_label = selected_label?.memoGroup.reduce((newList, memoId) => {
		const pick = memos.filter((memo) => memo.id === memoId)[0];
		newList.push(pick);
		return newList;
	}, []);
	return(
		<>
			<span>memo creater!</span>
			<Classfier memos={memos_by_label ? memos_by_label : memos}/>
		</>
	)
}
const Page = {
	Home,
	Archive,
	Reminder,
	Trash,
	Labels,
	DirectMemo,
};
export default Page;