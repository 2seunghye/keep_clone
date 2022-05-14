import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { PopupCaller } from "../Component/common/Popup";
import { selectLabel } from "../module/label";

// component:styled
const Navigation = styled.div`

`;
// component
function LabelListItem({ text }) {
	return <NavLink to={`/label/${text}`}>{text}</NavLink>;
}
function NavBar() {
	const labelState = useSelector(selectLabel);
	console.log("", labelState);
	
	return (
		<Navigation>
			<NavLink to="/">메모</NavLink>
			<NavLink to="/reminders">알림</NavLink>
			{0 < labelState.length && labelState.map((item) => <LabelListItem key={item.id} text={item.text} />)}
			<NavLink to="/archive">보관 처리</NavLink>
			<NavLink to="/trash">휴지통</NavLink>
			<PopupCaller name={"라벨 수정"} callerId={"navigation"} />				

			{/* <NavLink to="/editLabel"></NavLink> */}
		</Navigation>
	);
}

export default NavBar;
