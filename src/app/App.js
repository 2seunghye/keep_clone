
import { Route, Routes, useLocation } from "react-router-dom";
// component:called
import Layout from "features/global/Layout";
import Page from "app/Pages";

// component
function App() {
	const location = useLocation();
	const {state} = location;
	// const tester = new RegExp("^\/(note|list)", "gi");
	console.group("App");
	console.log("location : ", location);
	console.log("state : ", state);
	console.groupEnd("App");
	return (
		<div className="App">
			{/* App contents */}
			<Routes location={state?.background_location || location}>
				<Route path="*" element={<Layout />}>
					<Route index element={<Page.Home />}></Route>
					<Route path="reminders" element={<Page.Reminder />}></Route>
					<Route path="archive" element={<Page.Archive/>}></Route>
					<Route path="trash" element={<Page.Trash/>}></Route>
					<Route path="label/:labelText" element={<Page.Labels />}></Route>
					<Route path="note:memoId" element={<Page.DirectMemo />}></Route>
					<Route path="list:memoId" element={<Page.DirectMemo />}></Route>
				</Route>
			</Routes>

			{/* Popup:memo */}
			{
				state?.background_location &&
				<Routes>
					<Route path="note/:memoId" element={
						<div>메모 팝업 - noting</div>
					}></Route>
					<Route path="list/:memoId" element={
						<div>메모 팝업 - checkbox</div>
					}></Route>
				</Routes>
			}
		</div>
	);
}
export default App;
