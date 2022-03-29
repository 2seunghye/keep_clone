import React from "react";

const FixedButton = ({ isFixed, onToggleFixed }) => {
	return (
		<div>
			<button 
				onClick={onToggleFixed}
			>{isFixed ? "고정 해제" : "고정"}</button>
		</div>
	);
};

export default FixedButton;
