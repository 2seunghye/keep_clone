import React from "react";
import styled from "styled-components";
import AddLabelForm from "./AddLabelForm";
import LabelList from "./LabelList";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

// Todo :: 라벨 자동 search 기능 추가

const LabelBox = ({ id, updateLabelInMemo, labels }) => {
	return (
		<StyledDiv>
			<h5>Label Box</h5>
			<AddLabelForm id={id} updateLabelInMemo={updateLabelInMemo} labels={labels} />
			<LabelList labels={labels} />
		</StyledDiv>
	);
};

export default LabelBox;
