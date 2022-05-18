import { useState } from "react";

const useInput = (_initialValue)=>{
	const [input, setInput] = useState(_initialValue);
	const onChange = (e) => setInput(e.target.value);
	const onRestore = (_word = _initialValue) => setInput(_word);
	return [
		input,
		setInput,
		onChange,
		onRestore
	]
};

export default useInput;