import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { selectLabel } from "../../module/label";
import { removeMemoLabel } from "../../module/memo";

function LabelTag({ memoId, labelGroup }){
	const labelState = useSelector(selectLabel);
	const dispatch = useDispatch();
	const onRemove = (_id)=>()=>{
		const payload = labelGroup.filter(labelId => labelId !== _id);
		const action = Object.assign(
			removeMemoLabel(payload),
			{memoId}
		);
		dispatch(action);
	};
	return(
		labelGroup.map( (labelId) => {
			<div key={labelId}>
				{labelState.filter(label => labelId === label.id)[0]?.text}
				<button type="button" onClick={onRemove(labelId)}>
					Delete
				</button>
			</div>
		})
	);
};

export default LabelTag;