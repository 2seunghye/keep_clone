import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import LabelMenu from "../Component/LabelMenu";
import ShowMemoWithLabel from "../Component/LabelMenu/ShowMemoWithLabel";
import HomeView from "../View/HomeView";
import LabelView from "../View/LabelView";
import NavBar from "./NavBar";

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/label" element={<LabelView />}>
				<Route path=":labelText" element={<ShowMemoWithLabel />} />
			</Route>
		</Routes>
	);
};

export default RoutesComponent;
