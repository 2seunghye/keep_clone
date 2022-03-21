import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LabelList from "../Component/LabelBox/LabelList";

const ListItem = ({ text, id, setId }) => {
	return (
		<NavLink to={`/label/${text}`} onClick={() => setId(id)}>
			{text}
		</NavLink>
	);
};

const NavBar = () => {
	const [activeId, setId] = useState(null);

	const LabelState = useSelector((state) => state.labelFetch);

	const LabelList = LabelState.map((item) => <ListItem key={item.id} id={item.id} text={item.text} setId={setId} />);

	return (
		<div>
			<NavLink to="/">홈</NavLink>
			{LabelList}
		</div>
	);
};

export default NavBar;
