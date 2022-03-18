import React from "react";
import { useSelector } from "react-redux";

const ListItem = ({ text, id, setId }) => {
	return (
		<li>
			<button onClick={() => setId(id)}>{text}</button>
		</li>
	);
};

const LabelList = ({ setId }) => {
	const LabelState = useSelector((state) => state.labelFetch);

	const LabelList = LabelState.map((item) => <ListItem key={item.id} id={item.id} text={item.text} setId={setId} />);

	return <ul>{LabelList}</ul>;
};

export default LabelList;
