import React from "react";
import Contents from "features/memo/component/Contents";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMemoById } from "../memoSlice";
function Memo({memo}){
	const params = useParams(); 
	console.group("Memo");
	console.log("params :", params);
	console.groupEnd("Memo");
	const {id, useCheckbox} = memo;
	return(
		<Contents memoId={id} useCheckbox={useCheckbox}/>
	);
}

export default Memo;