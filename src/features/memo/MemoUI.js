import React from "react";
// component:called
import UIButton from "../global/UIButton";
import {PopupCaller} from "../popup/Popup";
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
