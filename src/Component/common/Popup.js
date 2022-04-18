import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPopupByKeyname } from "../../module/popup";
import usePopup from "../../customHooks/usePopup";
import UIButton from "./UIButton";
// component:styled
const FloatingLayer = styled.div`
	position:absolute;
	top:0;
	left:0;
	display:${(props)=>props.active ? "flex" : "none"};
	flex-direction:column;
`;
function Popup({keyname, contents}){
	const selectedPopup = useSelector(selectPopupByKeyname(keyname));
	return(
		<FloatingLayer active={selectedPopup.isCalled}>
			{contents}		
		</FloatingLayer>
	);
};
export function PopupCaller({name, callerId}){
	console.log("PopupCaller :", callerId);
	const [isCalled, setCall, setClose] = usePopup(name, callerId);
	const onTogglePopup = ()=>{
		isCalled ? 
		setClose() :
		setCall();
	};
	return (
		<UIButton 
			name={name} 
			interaction={onTogglePopup}
		/>
	);
};
export default Popup;