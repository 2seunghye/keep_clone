import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { selectLabels } from "../../module/label";
import { removeMemoLabel } from "../../module/memo";

function LabelTag({ memoId, labelGroup }){
	const labelState = useSelector(selectLabels);
	const dispatch = useDispatch();
	const onRemove = (_id)=>()=>{
		const new_array_by_id = labelGroup.filter(labelId => labelId !== _id);
		const payload = new_array_by_id;
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