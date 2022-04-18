import React from "react";
// component:called
import UIButton from "../common/UIButton";
import {PopupCaller} from "../common/Popup";
// component
function MemoUI({ uiList, memoId }) {
	return (
		uiList.map(({ name, interaction, hasMenu }) => {
			if(hasMenu) return <PopupCaller key={name} name={name} memoId={memoId} />
			return <UIButton key={name} name={name} interaction={interaction} />
		})
	);
}
export default MemoUI;
