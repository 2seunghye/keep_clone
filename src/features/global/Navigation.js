import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// component:called
import { PopupCaller } from "../popup/Popup";
import { selectLabels } from "../label/labelSlice";
// component
function LabelListItem({ text }) {
	return <Link to={`/label/${text}`}>{text}</Link>;
}
function Navigation() {
	const component_id = "navigation";
	const labelState = useSelector(selectLabels);
	return (
		<nav className={component_id}>
			<NavLink to="/">메모</NavLink>
			<NavLink to="/reminders">알림</NavLink>
			{
				// Link by labelText
				0 < labelState.length && 
				labelState.map(
					(item) => <LabelListItem key={item.id} text={item.text} />
				)
			}
			<NavLink to="/archive">보관 처리</NavLink>
			<NavLink to="/trash">휴지통</NavLink>
			<PopupCaller name={"라벨 수정"} callerId={"라벨 수정"} />
			{/* <NavLink to="/editLabel"></NavLink> */}
		</nav>
	);
}

export default Navigation;
