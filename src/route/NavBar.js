import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ListItem = ({ text }) => {
	return <NavLink to={`/label/${text}`}>{text}</NavLink>;
};

const NavBar = () => {
	const LabelState = useSelector((state) => state.labelFetch);

	const LabelList = LabelState.map((item) => <ListItem key={item.id} text={item.text} />);

	return (
		<div>
			<NavLink to="/">홈</NavLink>
			<NavLink to="/editLabel">라벨 수정</NavLink>
			{LabelList}
		</div>
	);
};

export default NavBar;
