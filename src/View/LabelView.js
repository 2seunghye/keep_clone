import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import LabelMenu from "../Component/LabelMenu";

const LabelView = () => {
	return (
		<>
			<>labelView</>
			<Outlet />
		</>
	);
};

export default LabelView;
