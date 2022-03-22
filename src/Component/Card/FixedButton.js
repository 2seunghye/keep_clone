import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { toggle_fixed_status } from "../../Redux/Actions/memo";

const FixedButton = ({ listId, isFixed }) => {
	const [status, setStatus] = useState(isFixed);
	const dispatch = useDispatch();

	const onToggle = () => {
		dispatch(toggle_fixed_status(listId));
		setStatus((status) => !status);
	};

	return (
		<div>
			<button onClick={onToggle}>{status ? "고정해제" : "고정"}</button>
		</div>
	);
	// return <div>FixedButton</div>;
};

export default FixedButton;
