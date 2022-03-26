import React, { useState } from "react";

const useInput = (_initialValue)=>{
	const [input, setInput] = useState(_initialValue);
	const onChange = (e) => setInput(e.target.value);
	return [
		input,
		setInput,
		onChange
	]
};

export default useInput;