import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPopupByKeyname } from "../../module/popup";
import usePopup from "../../customHooks/usePopup";
import UIButton from "./UIButton";
// component:styled
const Tooltip = styled.div`
	position:absolute;
	top:0;
	left:0;
	display:${(props)=>props.active ? "flex" : "none"};
	flex-direction:column;
`;
function Popup({keyname, contents}){
	const selectedPopup = useSelector(selectPopupByKeyname(keyname));
	return(
		<Tooltip active={selectedPopup.isCalled}>
			{contents}		
		</Tooltip>
	);
};
export function PopupCaller({name}){
	const [isCalled, setCall, setClose] = usePopup(name);
	const onToggleMorePopup = ()=>{
		isCalled ? 
		setClose() :
		setCall();
	};
	return (
		<UIButton 
			name={name} 
			interaction={onToggleMorePopup}
		/>
	);
};
export default Popup;