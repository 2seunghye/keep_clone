import React from "react";
import styled from "styled-components";
const Icon = styled.span`

`;
const ScreenOnlyText = styled.span`
	overflow:hidden;
	position:relative;
	z-index:-1;
	clip:rect(0,0,0,0);
	width:1px;
	height:1px;
	opacity:0;
	color:transparent;
`;
const FixedButton = ({ isFixed, onToggleFixed }) => {
	return (
		<button 
			onClick={onToggleFixed}
		>
			<Icon />
			<div>{isFixed ? "고정 해제" : "고정"}</div>
		</button>
	);
};

export default FixedButton;

// issue
/*
	isFixed 값이 수정될 때 memocard component 하위의 모든 컴포넌트를 새로 그림.
	이후 원본 사이트처럼 position 값만 바꾸도록 작업 진행할 예정. 
	이 좌표 값을 store에 저장해두려고 했으나,
	리렌더링이 일어나므로, 적합한 지 의문.
*/