import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./Redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

// const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};

const store = createStore(reducers, composeWithDevTools());

store.subscribe(() => {
	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
