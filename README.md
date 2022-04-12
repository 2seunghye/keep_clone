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