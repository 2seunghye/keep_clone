import React, { useState } from "react";
import ShowMemoWithLabel from "./ShowMemoWithLabel";
import styled from "styled-components";
import LabelList from "./LabelList";

const StyledDiv = styled.div`
	border: 2px dotted pink;
	max-width: 500px;
	margin: 20px;
`;

const LabelMenu = () => {
	return (
		<StyledDiv>
			<h5>Label Menu</h5>
			{/* <LabelList setId={setId} />
			<ShowMemoWithLabel activeId={activeId} /> */}
		</StyledDiv>
	);
};

export default LabelMenu;
