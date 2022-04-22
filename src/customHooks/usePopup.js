import { useDispatch, useSelector } from "react-redux";
import { deactivatePopup, activatePopup } from "../module/app";
import { callPopup, closePopup, selectPopupByKeyname } from "../module/popup";

const usePopup = function(_keyname, _memoId){
	const dispatch = useDispatch();
	const targetPopup = useSelector(selectPopupByKeyname(_keyname));
	const {isCalled} = targetPopup;
	const createAction = (_pipe, _payload) => Object.assign(_pipe(_payload), {id : _keyname});
	const setCall = ()=>{
		let next = false;
		dispatch(
			createAction(activatePopup, {
				activeId : _keyname,
				calleeId : _memoId,
				memoId : _memoId,
			})
		);
		next = true;
		if(!next) return;
		dispatch(
			createAction(callPopup, {
				isCalled : true,
				calleeId : _memoId
			})
			);
		};
	const setClose = ()=>{
		let next = false;
		dispatch(
			createAction(deactivatePopup, {
				activeId : null,
				calleeId : null,
				memoId : null,
			})
		);
		next = true;
		if(!next) return;
		dispatch(
			createAction(closePopup, {
				isCalled : false,
				calleeId : _memoId 
			})
		);
	};
	return [
		isCalled, 
		setCall,
		setClose
	];
};

export default usePopup;