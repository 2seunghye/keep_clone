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

#### 2022.04.19
useEffect/useLayoutEffect 이슈
react.strictmode 사용 시, 라이프사이클에서 willmount와 mount 시기에 2번 실행해 스코프 안에서 사용한 변수의 적합성을 판단한다. 

이 때문에 event listening이 2번되는 문제가 생기는데, dev 서버에서 다음과 같이 이벤트의 중복 실행을 방지할 수 있다.  

1. useCallback 사용 
handler callback을 useEffect 바깥에서 정의하고
useCallback에 모니터링을 위임
예제는 다음과 같음.
<code>
const handler = useCallback(
    function(event){...},
    [def]
)
</code>

#### 2022.04.25
- issue
개별 메모를 클릭할 때 url을 바꾸며 해당 메모를 transition 하는 로직이 필요. 
+ opportunity
path":memoid" .... 
const {memoId} = useParams();

위 방식으로,
스토어를 사용함에도 id을 props로 내려보내야 하는 이슈를 같이 해결할 수 있을 듯.

- 진행 상황.
router를 재구성 중. 

##### "/" | "\*" | "\/*" 의 차이
wildcard - * - 의 사용법을 아래와 같이 가이드해주었는데,
"..., but will have the weakest precedence so the router will only pick it if no other routes match."
출처[https://reactrouter.com/docs/en/v6/getting-started/overview#not-found-routes]

url을 탐색 과정에서 wildcard가 있으면, 해당 route의 element로 탐색 대상이 넘어가며, 해당 컴포넌트의 routes/route를 탐색한다. 이런 전개를 보면 wildcard는 route 컴포넌트의 direct url로 보는 게 옳다. redirection도 여기에 착안해서 useNavigate와 잘 섞어 쓸 수 있을 듯.

<Routes>
    <Route path="*" element={<A />} />
    <Route path="*" element={<B />} />
</Routes>

위와 같으면, <A />로 이동한다.

#### 2022.04.26
##### 메모 클릭 시 url 변경 <= 라우팅 사용
url 변화와 관계없이 바닥에 깔린 메모는 항상 유지. 다만 클릭한 메뉴에 따라 조건으로 filter한 메모들이 놓인다. 

!라우팅에 무관하게 늘 보이는 컴포넌트는 Route의 바깥으로 빼자.
ㄴbrowserRouter로 App 컴포넌트를 감싸더라도 Route 컴포넌트에 컴포넌트를 담지 않는 이상 parameter를 변화시킬 수 없었다. 
<MemoList />
<Route path="/" element={<App />}>
    ...
</Route>

그리고 보관처리|휴지통의 경우엔 새 메모를 만드는 컴포넌트를 렌더링하지 않았다. 

위 ui를 담기위한 route 구성

Index.js
<BrowserRouter>
    <Routes>
        <Route path="/*" element={<App />} />
    </Routes>
</BrowserRouter>
App.js

function Default(){
    return(
        <>
            <MemoCreator />
            <Outlet />
        </>
    )
}
....
<Routes>
    <Route path="*" element={<Layout />}>
        <Route index element={<>
            <MemoCreator />
            <MemoList />    // default  컴포넌트로 넣으면 다시 중첩과 path="*"가 필요.
        </>} />
        <Route path="list" element={<Default />}>
            <Route path=":memoId" element={<MemoList /> />
        </Route>
        <Route path="announce" element={<Default />}>
            <Route index element={<MemoList />/>
        </Route>
        <Route path="keep" element={<Keep />}>
            <Route index element={<MemoList memos={memos.filter(...)} />/>
        </Route>
        <Route path="trash" element={<Trash />}>
            <Route index element={<MemoList memos={memos.filter(...)} />/>
        </Route>
    </Route>
</Routes>

- 구성 후 이슈
<Keep>과 <Trash>의 memos.length == 0 인 화면의 렌더링 기준 

기본 화면 - index -과 동일하게 url의 변경없이 렌더링하는 것이 전제. 
Route로 만들 수 없고, 조건부 렌더링이 필요.

그런데, 

<Outlet> 컴포넌트가 state를 받아넘기는 기능이 없음.
<Keep>과 <Trash>에 받는 props를 그 자식 컴포넌트에게 줄 방법이 없어
중첩을 제거하고 <MemoList />를 직접 렌더링하도록 바꿈.

To-be
...
<Route path="keep" element={<Keep memos={memos.filter(...)}/>} />
<Route path="trash" element={<Trash memos={memos.filter(...)}/>} />