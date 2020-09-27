# 4장

## 컨텍스트 API로 데이터 전달

상위 컴포넌트에서 하위 컴포넌트로 뎁스가 깊어지면 기계적으로 값을 넘겨주어야한다.

이를 해결하기 위해서 리액트의 컨텍스트 API를 활용한다.

사용법 예시
```
import React, {createContext} from 'react';


const UserContext = createContext('unknown');

export default function App() {
    <UserContext.Provider value="mike">
        <Profile />
    </UserContext.Provider>
}

function Profile() {
    return (
        <>
            <Greeting />
        </>
    )
}

function Greeting() {

    return ( 
        <UserContext.Consumer>
            {username => <p>{`${username} 님 안녕하세요`}</p>}
        </UserContext.Consumer>

    )
}

```


위의 코드와 같이 `Context`의 `Consumer`는 가장 가까운 위치의 부모에 `Provider` 컴포넌트를 찾아서 값을 가져온다. 

만약 루트까지 올라갔는데도 찾지 못하면 `createContext`에서 정의한 초기값이 사용된다.

`Provider`의 값이 변경되면 하위의 `Consumer` 컴포넌트가 리렌더링된다. 또한 중간에 컴포넌트가 렌더링 되지 않아도 렌더링된다.

위의 코드는 훅을 사용하면 더욱 간단하게 변한다. @Autowired 느낌.
```
import React, {createContext} from 'react';


const UserContext = createContext('unknown');

export default function App() {
    <UserContext.Provider value="mike">
        <Profile />
    </UserContext.Provider>
}

function Profile() {
    return (
        <>
            <Greeting />
        </>
    )
}

function Greeting() {
    const username = useContext(UserContext);

    return <p>{`${username} 님 안녕하세요`}</p>
}

```


하위 컴포넌트에서 데이터를 수정하는 방법은 데이터를 수정할 수 있는 함수를 별도의 컨텍스트로 만든다.


```
// 상위 컴포넌트 
const userContext = createContext('unknown');
const SetUserContext = createContext(()=>{});

export default funtion App() {
    const [user, setUser] = useState({});

    <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
            <Profile/>
        </UserContext.Provider>
    </SetUserContext.Provider>
}

```

상태값 변경함수를 컨텍스트로 만들어서 넘겨주면 된다.

하지만 객체로 관리할 때 `useState` 를 사용하면 `Provider`의 값이 변경될 때 마다 `Consumer` 의 값이 불필요하게 렌더링된다.

이를 해결하는 방법으로는 컨텍스트의 값을 객체로 관리하여 객체를 넘겨주면 된다.

사용 시 주의 사항

Provider 를 만나지 못해 root까지 올라간 후 'unknow' 초기값을 사용하게 되는 경우...
```
<UserContext.Provider value={user}></UserContext.Provider>
<Profile/> // 하위 컴포넌트로 Greeting 컴포넌트가 있음.
```

### Dom 요소에 직접 접근하기 

useRef 를 이용하여 실제 돔 요소를 컨트롤할 수 있다.


useEffect 후 안에서 적용을 할 수 있다. 이유는 실제 돔이 그려진 다음에 접근해야하기 때문이다.





