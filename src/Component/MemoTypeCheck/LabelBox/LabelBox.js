import React from "react";
import styled from "styled-components";
import AddLabelForm from "./AddLabelForm";
import LabelList from "./LabelList";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const LabelBox = ({ index, type }) => {
	return (
		<StyledDiv>
			<AddLabelForm index={index} />
			<LabelList index={index} type={type} />
		</StyledDiv>
	);
};

export default LabelBox;
