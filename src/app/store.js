import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
// setting store
const envelopmentMode = process.env.NODE_ENV;
const store = configureStore({
	reducer: rootReducer,
	devTools: envelopmentMode === "development",
});

export default store;