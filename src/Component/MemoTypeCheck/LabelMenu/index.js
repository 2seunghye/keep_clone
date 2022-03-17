import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMemoWithLabel from "./ShowMemoWithLabel";

const LabelMenu = () => {
	const [activeId, setId] = useState(0);

	const onClickLabel = (id) => {
		setId(id);
	};

	const ListItems = ({ text, id }) => {
		return (
			<li>
				<button onClick={() => onClickLabel(id)}>{text}</button>
			</li>
		);
	};

	const LabelState = useSelector((state) => state.labelFetch);

	const List = () => {
		const labelList = LabelState.map((item) => <ListItems id={item.id} key={item.id} text={item.text} />);

		return <ul>{labelList}</ul>;
	};

	return (
		<div>
			<h3>라벨 전체보기</h3>
			<List />
			{activeId !== 0 ? <ShowMemoWithLabel activeId={activeId} /> : ""}
		</div>
	);
};

export default LabelMenu;
