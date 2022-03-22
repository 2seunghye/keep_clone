import React from "react";
import { Route, Routes } from "react-router-dom";
import ShowMemoWithLabel from "../Component/ShowMemoWithLabel";
import EditLabelView from "../View/EditLabelView";
import HomeView from "../View/HomeView";
import LabelView from "../View/LabelView";

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/editLabel" element={<EditLabelView />} />
			<Route path="/label" element={<LabelView />}>
				<Route path=":labelText" element={<ShowMemoWithLabel />} />
			</Route>
		</Routes>
	);
};

export default RoutesComponent;
