import { useDispatch, useSelector } from "react-redux";
import { callPopup, closePopup, selectPopupByKeyname } from "../module/popup";

const usePopup = function(_keyname){
	const dispatch = useDispatch();
	const targetPopup = useSelector(selectPopupByKeyname(_keyname));
	console.log(targetPopup);
	const {isCalled} = targetPopup;
	const createAction = (_pipe, _payload)=>{
		return Object.assign(
			_pipe(_payload),
			{id : _keyname}
		)
	};
	const setCall = ()=>{
		dispatch(
			createAction(callPopup, {isCalled : true})
		);
	};
	const setClose = ()=>{
		dispatch(
			createAction(closePopup, {isCalled : false})
		);
	};
	return [
		isCalled, 
		setCall,
		setClose
	];
};

export default usePopup;