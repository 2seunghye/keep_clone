import { useDispatch, useSelector } from "react-redux";
import { floatingPopup } from "../module/app";
import { callPopup, closePopup, selectPopupByKeyname } from "../module/popup";

const usePopup = function(_keyname, _memoId){
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
		let next = false;
		dispatch(
			createAction(floatingPopup, {
				activeId : _keyname,
				calleeId : _memoId,
				memoId : _memoId,
			})
		);
		next = true;
		if(!next) return;
		dispatch(
			createAction(callPopup, {isCalled : true})
			);
		};
	const setClose = ()=>{
		let next = false;
		dispatch(
			createAction(floatingPopup, {
				activeId : null,
				calleeId : null,
				memoId : null,
			})
		);
		next = true;
		if(!next) return;
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