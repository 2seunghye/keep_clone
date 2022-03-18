import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { create_label, delete_label, update_label } from "../../Redux/Actions/label";
import AddLabelForm from "./AddLabelForm";
import LabelList from "./LabelList";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const LabelBox = () => {
	return (
		<StyledDiv>
			<AddLabelForm />
			<LabelList />
		</StyledDiv>
	);
};

export default LabelBox;
