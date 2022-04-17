import React from "react";
// component:called
import UIButton from "../common/UIButton";
// component
function MemoUI({ uiList }) {
	return (
		uiList.map(({ name, interaction }) => 
			<UIButton key={name} name={name} interaction={interaction} />
		)
	);
}
export default MemoUI;
