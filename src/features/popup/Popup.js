import React from "react";
import styled from "styled-components";
// redux
import { useSelector } from "react-redux";
// from global
import usePopup from "customHooks/usePopup";
import UIButton from "features/global/component/UIButton";
// from popup
import { selectPopupByKeyname } from "features/popup/popupSlice";
// component:styled
const Dialog = styled.div`
	position:absolute;
	top:0;
	left:0;
	display:${(props)=>props.active ? "flex" : "none"};
	flex-direction:column;
`;
// component
export function PopupCaller({name, callerId}){
	// console.log("PopupCaller :", callerId);
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
function Popup({keyname, contents}){
	const selectedPopup = useSelector(selectPopupByKeyname(keyname));
	return(
		<Dialog active={selectedPopup.isCalled}>
			{contents}		
		</Dialog>
	);
};
export default Popup;