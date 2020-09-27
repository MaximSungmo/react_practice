
# 2장

## 컴포넌트 속성값과 상태값

리액트는 변수의 값이 변경된 경우에 상태값 또는 속성값이 변경되었다는 것을 알려줘야만 변경할 수 있다 .

이를 위해서 사용하는 코드는 `useState` 를 통해서 변경에 대해 알려줄 수 있다. 

리액트에서는 상태값을 변경할 때 해당 값이 속성 값으로 들어가지 않은 상태에서 별 의미없는 렌더링을 없애기 위해서

`React.memo()` 함수를 통해서 최종적으로 컴포넌트의 속성값이 변경되지 않는다면 별다른 렌더링을 호출하지 않습니다.

```
export default React.memo(Title);
```

또한 각자의 컴포넌트에서 각자의 상태값을 유지하고 있으므로 여러 곳에서 컴포넌트를 호출한다하더라도 각자의 값이 유지가 되는 것이다.

속성 값은 불변 변수이지만 상태 값은 불변 변수가 아니다.

따라서 props로 넘어온 값을 수정하고 싶다면 부모 컴포넌트에서 상태값 변경을 하는 방식을 이용해야한다.

```
// 객체의 참조값만 변경된 경우에는 리액트입장에서 값이 변경되지 않았다고 생각한다.
// 따라서 이를 불변 변수로 관리하기 위하여 전개연산자(스프레드) 를 이용한다.
function onClick3(){
    // count3.value += 1;
    // setCount3(count3);
    setCount3({...count3, value: count3.value +1})
}
```


## 리액트 컴포넌트와 가상돔

리액트가 컴포넌트를 호출하면 다음과 같은 형식의 객체가 된다

```
{
    type:'div',
    props:{
        children: [
            {
                type:'p',
                props:{
                    children:'안녕하세요',
                },
            },
            {
                type:'p',
                props:{
                    children:'안녕하세요2',
                },
            },
        ]
    }
}
```

리액트에서는 `렌더 단계`에서 `가상돔`을 만들고 `커밋단계` `실제 돔` 을 만들어낸다.

실제 돔과 가상 돔을 비교하여 리액트 컴포넌트는 꼭 필요한 변경 부분만 렌더링하고 그 외의 부분은 별도의 렌더링을 다시하지 않는다.

또한 `React.memo` 함수를 적용한 경우 해당 props의 값이 변경되지 않았다면 다시 렌더링하지 않는다.


## 리액트 훅

리액트 훅은 컴포넌트에 기능을 추가할 때 사용하는 함수이다.

- useState: 상탯값 추가
- useEffect: 부수효과 처리
    -   서버 API 호출, 이벤트 핸들러 등록 등..


### useState()

useState는 초기 값을 넣어서 호출하고, 배열을 반환하게 된다.
첫 번째 아이템은 상탯값, 두 번째 아이템은 상태값 변경 함수를 반환하게 된다.

```
const [count, setCount] = useState(0);
```
상탯값 변경 함수는 `비동기`이면서 `배치`로 동작한다.
`동기`로 처리하게 된다면 성능이슈가 발생할 수 있기 때문이다. 

즉, 리액트 내부에서 관리하는 함수의 경우에는 `배치` 로 처리되기 때문에, 이를 원하는 방식으로 동작하게 하려면 상탯값 변경 함수의 파라미터를 함수로 넣어주면 된다. 


외부에서 처리되는 값인 `useEffect` 함수를 사용하게되면 이는 배치로 처리되지 않기 때문에 중복 호출이 된다.

`배치`로 처리되기를 원한다면 `ReactDOM.unstable_batchedUpdates() 함수로 호출하면 된다.



여러 개의 상태값을 관리할 때는 `useState` 보다는 ` useReducer`를 사용하는 게 적합하다. 


### useEffect()

`useEffect` 함수는 렌더링이 된 후에 실제돔에 반영된 후 실행된다.

```
useEffect(()=> {
    api.then(~~~ => setData(~~));    
}, [data]);
```
렌더링이 자주 발생한다면 api 자꾸 호출하게 될텐데, 이는 비효율적이므로 두 번째 매개변수로 의존성 매개변수를 넣어줄 수 있는데, 이 값이 변경될 때만 `useEffect` 가 실행이 될 수 있게 만들 수 있다. 

이 의존성 배열에는 해당 컴포넌트의 지역변수 또는 파라미터로 넘어온 값, 함수등을 입력해줘야한다.
이를 입력하지 않으면 lint error 가 발생한다.
다만, setUser 와 같은 useState의 상태값 변경 함수나 또는 컴포넌트 외부의 함수는 작성할 필요가 없다.

리액트에서는 메모이제이션을 위해 `useCallback` 함수가 있다.


### Custome Hook 만들기 

커스텀 훅은 일반적으로 `use` 프리픽스로 만드는 게 좋다.

```
// useUser.js

export default function useUser(userId){
    const[user, setUser] = useState(null);
    useEffect(()=>{
        getUserApi(userId).then(data=> setUser(data));        
    }, [userId]);

    return user;
}
```


```
// useMounted.js
import {useEffect, useState} from 'react';

export default function useMounted() {
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    }, []);
    return mounted;
}

```

### Hook 사용 시 지켜야 할 규칙
1. 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.

2. 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.
    - if 문 또는 for 문에서 훅을 호출하면 안된다.
    






