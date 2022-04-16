# keep_clone

## code convention

-   컴포넌트 함수는 arrow 함수로 작성하지 않음.
    function name(){}

화면에 보여지는 dom인지, event 함수인지, action creater,
const name ()=>{}------

## component 계층 별 이벤트 관리

크게 memo > contents + ui로 나누고
memo의 status 변화는 memo 계층의 컴포넌트에서
contents는 header와 본문,
제공되는 옵션은 ui에서 다루거나 위임을 받는 것으로 정함.

-   folder tree
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
base
ㄴvariable
ㄴutility(or library)
feature
[feature name...] ex. navigation, memo, memoContents, label...
ㄴindex.js <controller component>
ㄴreducer.js <reducer>
ㄴview
ㄴㄴ\*.js <presentation component>
ㄴstyled <styled-component>
ㄴsupport
ㄴㄴui.js <event logic>
ㄴdata

#### 2022.04.13

3월 말부터 4월 13일까지 적용한 내용 정리

-   react18로 버전업/마이그레이션
-   redux toolkit 적용 - creatStore, createSlice만 우선 적용. - 데이터 수신을 로컬에서 api로 수정할 때 createAsyncChuck, extraReducer 추가할 예정.

-   memo의 contents를 memo에서 분리하여 memoId로 조회하는 테이블을 추가함.
-   단일 content의 crud 로직을 추가 - 예를 들어 체크박스 아이템 하나의 체크 상태, 내용 등을 업데이트
-   상기 케이스의 reducer를 위해 high order reducer 적용. 위치는 utils/index.js
-   memo 내용에 따라 - checkbox|text editor - 렌더링 컴포넌트 분리[^1] 하고 계층을 정리함[^2].

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

#### 2022.04.14
label ui의 의존성 이슈.

label에 대한 데이터가 2가지로 나뉨.
a. label 목록 자체
b. 메모에서 선택한 label 집합

a는 labelState로 b는 memoState의 종속 데이터로 관리. 

라벨 추가/변경 ui의 목록은 단순 스프레드에 불과해 a만 사용하면 되지만, 
메모 안의 label 집합은 check에 의해 변경이 요구되고, 또한 label text가 업데이트 되면 이 역시 반영되어야 함.

그래서 데이터를 다음의 형태로 만듬.

memoState = [
    <!-- one set memo -->
    {
        ...,
        labels : [
            ...label_id
        ]
    }
]

labelState = [
    <!-- one set label -->
    {
        ...,
        memoGroup : [
            ...memo_id
        ]
    }
]

메모 안의 label을 렌더링하는 컴포넌트 - LabelTag - 를 생성.

LabelTag의 의존성은 memoState의 id.
다만 판본 - 렌더링 데이터 - 은 labelState.

memoState.labels의 id 집합에 변경이 생기면 - add or remove - 리렌더링
labelState의 label text를 판본으로 바라보고 있으므로 변경이 생기면 - update - 리렌더링

로직도 여기에 귀속시켜,
1. 메모에 라벨을 추가/삭제
Flow : 
check/click가 발생한 memoId를 획득 => 
labelState.memoGroup을 업데이트 => 
memoState의 memo를 labelState.memoGroup로 조회 =>
해당 memo의 labels를 업데이트
2. 라벨 이름 업데이트
Flow :
labelState를 memoState.labels의 id로 조회 => 
매칭되는 label만 가져와 text를 렌더링

navigation은 이와 같은 로직을 state만 서로 반대로 바라보고 변경하도록.

#### 2022.04.15

memo의 이벤트 모듈 만들 예정.
button 컴포넌트의 추상화 예정.
icon 사용 시작.
