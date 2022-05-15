import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import reportWebVitals from "reportWebVitals";
// redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "app/rootReducer";
// router
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "app/App";

// setting store
const envelopmentMode = process.env.NODE_ENV;
const store = configureStore({
	reducer: rootReducer,
	devTools: envelopmentMode === "development",
});
store.subscribe(() => {
	localStorage.setItem("store", JSON.stringify(store.getState()));
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