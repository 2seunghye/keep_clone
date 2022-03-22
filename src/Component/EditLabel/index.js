import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreateBox from "./CreateBox";
import ReadBox from "./ReadBox";
import UpdateBox from "./UpdateBox";
import styled from "styled-components";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const LabelItem = ({ text }) => {
	const [isActive, setIsActive] = useState(false);
	return <div>{isActive ? <UpdateBox text={text} setIsActive={setIsActive} /> : <ReadBox text={text} setIsActive={setIsActive} />}</div>;
};

const EditLabel = () => {
	const labelState = useSelector((state) => state.labelFetch);

	const labelList = labelState.map((item) => {
		return <LabelItem text={item.text} />;
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
