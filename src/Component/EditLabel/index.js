import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBox from "./CreateBox";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";
import styled from "styled-components";
import { getAllLabels, selectLabel } from "../../module/label";

const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;
const LabelItem = ({ text }) => {
	const [isActive, setIsActive] = useState(false);
	return <div>{isActive ? <UpdateBox text={text} setIsActive={setIsActive} /> : <ReadBox text={text} setIsActive={setIsActive} />}</div>;
};

const EditLabel = () => {
	const labelState = useSelector(selectLabel);

	const labelList = labelState.map((item, index) => {
		return <LabelItem key={index} text={item.text} />;
	});

	return (
		<StyledDiv>
			<h5>Edit Label</h5>
			<CreateBox />
			{labelList}
		</StyledDiv>
	);
};

export default EditLabel;
