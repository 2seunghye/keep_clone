import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function ListItem({ text }){
	return <NavLink to={`/label/${text}`}>{text}</NavLink>;
};
function NavBar(){
	const LabelState = useSelector((state) => state.labelFetch);
	return (
		<div>
			<NavLink to="/">메모</NavLink>
			{LabelState.map((item) => 
				<ListItem key={item.id} text={item.text} />
			)}
			<NavLink to="/editLabel">라벨 수정</NavLink>
			
		</div>
	);
};

export default NavBar;
