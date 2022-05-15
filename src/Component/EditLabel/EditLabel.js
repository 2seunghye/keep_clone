import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateBox from "./CreateBox";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";
import { selectLabels } from "features/label/labelSlice";

const LabelItem = ({ text }) => {
	const [isActive, setIsActive] = useState(false);
	return <div>{isActive ? <UpdateBox text={text} setIsActive={setIsActive} /> : <ReadBox text={text} setIsActive={setIsActive} />}</div>;
};

const EditLabel = () => {
	const labelState = useSelector(selectLabels);
	return (
		<div>
			<h5>Edit Label</h5>
			<CreateBox />
			{labelState.map((item, index) => <LabelItem key={index} text={item.text} />)}
		</div>
	);
};

export default EditLabel;
