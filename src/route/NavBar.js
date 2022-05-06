import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PopupCaller } from "../Component/common/Popup";
import { selectLabel } from "../module/label";
function ListItem({ text }) {
	return <NavLink to={`/label/${text}`}>{text}</NavLink>;
}
function NavBar() {
	const labelState = useSelector(selectLabel);
	console.log(labelState);
	return (
		<div>
			<NavLink to="/">메모</NavLink>
			{labelState ? (
				labelState.map((item) => {
					return <ListItem key={item.id} text={item.text} />;
				})
			) : (
				<></>
			)}
			<PopupCaller name={"라벨 수정"} callerId={"navigation"} />				
			{/* <NavLink to="/editLabel"></NavLink> */}
		</div>
	);
}

export default NavBar;
