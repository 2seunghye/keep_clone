// const onCopy = (memo) => {
// 	const payload = {
// 		...memo,
// 		id: nanoid(),
// 		isFixed: false,
// 	};
// 	const action = copyMemo(payload);
// 	dispatch(action);
// };
// const onRemove = (memo) => {
// 	const payload = {
// 		id: memo.id,
// 	};
// 	const action = deleteMemo(payload);
// 	dispatch(action);
// };
// const onUseCheckbox = (memo) => {
// 	const payload = {
// 		...memo,
// 		useCheckbox: true,
// 	};
// 	const action = updateMemo(payload);
// 	dispatch(action);
// };
// const onUnuseCheckbox = (memo) => {
// 	const payload = {
// 		...memo,
// 		useCheckbox: false,
// 	};
// 	const action = updateMemo(payload);
// 	dispatch(action);
// };

// const ui_list_on_tooltip = [
// 	{
// 		name: "메모 삭제",
// 		interaction: onRemove,
// 	},
// 	{
// 		name: "라벨 추가",
// 		interaction: ()=>{},
// 	},
// 	{
// 		name: "라벨 변경",
// 		interaction: ()=>{},
// 	},
// 	{
// 		name: "그림 추가",
// 		interaction: () => {
// 			// canvas 호출
// 		},
// 	},
// 	{
// 		name: "사본 만들기",
// 		interaction: onCopy,
// 	},
// 	{
// 		name: "체크박스 표시",
// 		interaction: onUseCheckbox,
// 	},
// 	{
// 		name: "체크박스 숨기기",
// 		interaction: onUnuseCheckbox,
// 	},
// 	{
// 		name: "Google Docs로 복사",
// 		interaction: () => {},
// 	},
// ];