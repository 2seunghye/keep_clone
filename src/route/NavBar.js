import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function ListItem({ text }) {
	return <NavLink to={`/label/${text}`}>{text}</NavLink>;
}
function NavBar() {
	const { labelState } = useSelector((state) => state);
	return (
		<div>
			<NavLink to="/">메모</NavLink>
			{/* {labelState.map((id, text) => 
				<ListItem key={id} text={text} />
			)}
			<NavLink to="/editLabel">라벨 수정</NavLink> */}
		</div>
	);
}

export default NavBar;
