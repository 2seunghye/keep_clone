import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./Redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
// router
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import App from "./App";
import HomeView from "./View/HomeView";
import EditLabelView from "./View/EditLabelView";
import LabelView from "./View/LabelView";
import ShowMemoWithLabel from "./Component/ShowMemoWithLabel";

// setting
const store = createStore(reducers, composeWithDevTools());
// const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};
store.subscribe(() => {
	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

// DOM render
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<App />}>	{/* router.js를 app.js로 이관 */}
						<Route index element={<HomeView />} />
						{/* <Route path="/editLabel" element={<EditLabelView />} /> */}
						{/* <Route path="/label" element={<LabelView />}>
							<Route path=":labelText" element={<ShowMemoWithLabel />} />
						</Route> */}
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();