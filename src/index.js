import React from "react";
import { hydrateRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";

// router
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import HomeView from "./View/HomeView";
import EditLabelView from "./View/EditLabelView";
import LabelView from "./View/LabelView";
import ShowMemoWithLabel from "./Component/ShowMemoWithLabel";
import { memoState, labelState } from "./data/initialState";
// setting store
const envelopmentMode = process.env.NODE_ENV;
const store = configureStore({
	reducer: rootReducer,
	devTools: envelopmentMode === "development",
});
// const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};
store.subscribe(() => {
	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

// DOM render
const container = document.getElementById("root");
const root = hydrateRoot(
	container,
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<App />}>
						{" "}
						{/* router.js를 app.js로 이관 */}
						<Route index element={<HomeView />} />
						<Route path="/editLabel" element={<EditLabelView />} />
						<Route path="/label" element={<LabelView />}>
							<Route path=":labelText" element={<ShowMemoWithLabel />} />
						</Route>
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals();
