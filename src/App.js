import "./App.css";
import LabelBox from "./Component/LabelBox/LabelBox";
import MemoTypeCheck from "./Component/MemoTypeCheck/MemoTypeCheck";

function App() {
	return (
		<div className="App">
			<MemoTypeCheck />
			<LabelBox />
		</div>
	);
}

export default App;
