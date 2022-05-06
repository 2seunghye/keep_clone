import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";

// router
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

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
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<App />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
