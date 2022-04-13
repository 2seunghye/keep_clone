# keep_clone

## code convention
- 컴포넌트 함수는 arrow 함수로 작성하지 않음.
function name(){}

화면에 보여지는 dom인지, event 함수인지, action creater, 
const name ()=>{}------

## component 계층 별 이벤트 관리
크게 memo > contents + ui로 나누고
memo의 status 변화는 memo 계층의 컴포넌트에서
contents는 header와 본문, 
제공되는 옵션은 ui에서 다루거나 위임을 받는 것으로 정함.


- folder tree
/AS-IS/
component
	controller
	view
		styled		
ui
	feature
		memo
		label
		support
data

/TO-BE/
feature
	[feature name...] ex. navigation, memo, memoContents, label...
		index.js <controller component>
		reducer.js <reducer>
		view
			*.js <presentation component>
			styled <styled-component>
		support
			ui.js <event logic>
data


#### 2022.04.13
3월 말부터 4월 13일까지 적용한 내용 정리
- redux toolkit 적용
	- creatStore, createSlice만 우선 적용.
	- 데이터 수신을 로컬에서 api로 수정할 때 createAsyncChuck, extraReducer 추가할 예정.

- memo의 contents를 memo에서 분리하여 memoId로 조회하는 테이블을 추가함.
- 단일 content의 crud 로직을 추가 - 예를 들어 체크박스 아이템 하나의 체크 상태, 내용 등을 업데이트 
- 상기 케이스의 reducer를 위해 high order reducer 적용. 위치는 utils/index.js
- memo 내용에 따라 - checkbox|text editor - 렌더링 컴포넌트 분리[^1] 하고 계층을 정리함[^2]. 

-=-=- 주(^) -=-=-
[^1]. 해당 컴포넌트들을 controller 컴포넌트로 바꿈. 타입 분기를 위한 부모 컴포넌트가 이벤트 함수를 가지도록 하려 했으나, text 업데이트 방식이 양쪽이 다르고, checkbox 컴포넌트만 가지면 될 것들을 다 포괄하여 가지는 문제로 책임소재를 분명히 하기 위해 내려보냄. 이로 인해 memoId를 한번 더 props로 내리는 것은 유지.

[^2]. 
/AS-IS/
CardContents> ContentItem> CheckboxTypeItem or DefaultTypeItem 
/TO-BE/
CardContents> CheckboxTypeItem or DefaultTypeItem

-=-=- Message -=-=- 
앞으로는 일 혹은 주 혹은 일정 주기 별로 계속 일지를 남겨주세요.
혹은 notion등을 이용한 일지 작성 아이디어 바래요.

#### 2022.04.15
memo의 이벤트 모듈 만들 예정.
button 컴포넌트의 추상화 예정.
icon 사용 시작.