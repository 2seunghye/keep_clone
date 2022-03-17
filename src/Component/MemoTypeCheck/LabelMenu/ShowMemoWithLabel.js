import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../Input";
import List from "../List";

const StyledDiv = styled.div`
	border: 1px solid #000;
	max-width: 500px;
	margin: 20px;
`;

const ShowMemoWithLabel = ({ activeId }) => {
	const state = useSelector((state) => state.checkboxFetch);

	const result = state.filter((item) => {
		if (item.listLabels.length) {
			for (let i = 0; i < item.listLabels.length; ++i) {
				if (item.listLabels[i].id == activeId) {
					return item;
				}
			}
		}
	});

	let cardList = result.map((item, index) => {
		return (
			<StyledDiv key={index} id={index}>
				<Input index={index} />
				<List index={index} type={item.listType} />
			</StyledDiv>
		);
	});

	return <div>{cardList}</div>;
};

export default ShowMemoWithLabel;
