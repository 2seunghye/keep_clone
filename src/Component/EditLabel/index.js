import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";

const LabelItem = ({ text }) => {
	const [isActive, setIsActive] = useState(false);
	return <div>{isActive ? <UpdateBox text={text} setIsActive={setIsActive} /> : <ReadBox text={text} setIsActive={setIsActive} />}</div>;
};

const EditLabel = () => {
	const labelState = useSelector((state) => state.labelFetch);

	const labelList = labelState.map((item) => {
		return <LabelItem text={item.text} />;
	});

	return <div>{labelList}</div>;
};

export default EditLabel;
