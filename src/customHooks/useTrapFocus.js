import { useCallback, useLayoutEffect } from "react";

const focusable_elements = ["a", "button", "textarea", 'input:not([type="hidden"])', '[tabindex="0"]'].join(",");
const useTrapFocus = function(_element){
	console.log(4345, _element);
	const keyFilter = useCallback(
		function (native_event) {
			const is_pressed_tab = native_event.key.toUpperCase() === "TAB";
			const is_pressed_shift = native_event.shiftKey;
			// escape:not press tab key
			if (!is_pressed_tab) return false;
			//
			const all_elements = native_event.currentTarget.querySelectorAll(focusable_elements);
			const last_element = all_elements[all_elements.length - 1];
			const first_element = all_elements[0];
			const isLast = last_element === native_event.target;
			const isFirst = first_element === native_event.target;
			// escape:not press shift key
			if (!is_pressed_shift) {
				isLast && console.log("straight");
				return false;
			}
			// press tab + shift key
			isFirst && console.log("reverse");
		},
		[]
	);
	useLayoutEffect(() => {
		_element.addEventListener("keydown", keyFilter, false);
	}, [_element, keyFilter]);
};

export default useTrapFocus;