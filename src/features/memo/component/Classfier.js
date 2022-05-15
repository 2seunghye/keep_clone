import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
// component:called
import Memo from "features/memo/component/Memo";
// preset for re-group to data 
class List {
	constructor(name, text, list){
		this.name = name;
		this.classfiedText = text;
		this.list = list;
	}
};

// component
function Classfier({ memos }){
	const format = new Array(2);
	format[0] = new List("fixed memo", "고정됨", []);
	format[1] = new List("non fixed memo", "기타", []);
	const regroup = (_format, _memo)=> {
		const targetList = _format[_memo.isFixed ? 0 : 1].list;
		targetList.push(_memo);
		return _format;
	};
	const useClassfiedText = 0 < memos.filter(memo => memo.isFixed).length;
	return memos.reduce(regroup, format).map(
		({ name, list, classfiedText }) => {
			const isEmpty = 0 >= list.length;
			if(isEmpty) return;
			return <Container 
				key={name}
				memos={list} 
				text={useClassfiedText ? classfiedText : null} 
			/>
		}
	);
};
function Container({ memos, text }){
	const location = useLocation();
	const params = useParams();
	console.group("Container");
	console.log("params :", params);
	console.groupEnd("Container");
	return (
		<div>
			<span>{text}</span>
			{memos.map( memo => 
			<Link 
				key={memo.id}
				to={`/${memo.isChecked ? "list" : "note"}/${memo.id}`} 
				state={{background_location : location}}
			>
				<Memo memo={memo}/>
			</Link> )}
		</div>
	);
};

export default Classfier;