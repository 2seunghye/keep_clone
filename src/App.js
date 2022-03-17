import "./App.css";
import LabelBox from "./Component/LabelBox/LabelBox";
import LabelMenu from "./Component/MemoTypeCheck/LabelMenu";
import MemoTypeCheck from "./Component/MemoTypeCheck/MemoTypeCheck";

function App() {
	return (
		<div className="App">
			<LabelMenu />
			<MemoTypeCheck />
		</div>
	);
}

export default App;
