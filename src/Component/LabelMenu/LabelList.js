import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ListItem = ({ text, id, setId }) => {
	return (
		<li>
			<NavLink to={`/label/${text}`} onClick={() => setId(id)}>
				{text}
			</NavLink>
		</li>
	);
};

const LabelList = ({ setId }) => {
	const LabelState = useSelector((state) => state.labelFetch);

	const LabelList = LabelState.map((item) => <ListItem key={item.id} id={item.id} text={item.text} setId={setId} />);

	return <ul>{LabelList}</ul>;
};

export default LabelList;
