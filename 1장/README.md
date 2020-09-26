# react_practice
react_practice


# 1장 

## 1.  리액트 앱 직접 만들기

1. 파일 준비하기

hell-world 
 |- react-dom.development.js
 |- react-development.js 
 |- simple1.html
 |- simple1.js

2. 다음의 코드를 사용해서 React.Component 를 만들기
```
function LikeButton() {
    const [liked, setLiked] = React.useState(false);
    const text =liked ? "좋아요 취소" : "좋아요";
    return React.createElement(
        'button',
        { onClick: () => setLiked(!liked)},
        text,
    )
}

```

3. 다음의 코드를 사용해서 React.Dom 에 React.Component 추가하기
```
const domContainer = document.getElementById('root');
ReactDOM.render(
    React.createElement(
        'div',
        null,
        React.createElement(LikeButton),
        React.createElement(LikeButton),
        React.createElement(LikeButton),
    ), 
    domContainer,
);
```

## 2. 바벨 설치
바벨을 설치하여 React.Component를 조금 더 쉽게 JSX 문법으로 생성해낼 수 있다.

1. npm 으로 바벨 설치

```
 npm install @babel/core @babel/cli @babel/preset-react
```

2. 소스 폴더 이동
 babel
    |- src
        |- simple1.js
    |- .html, react-dom, react ...

3. 바벨 실행
```
npx babel --watch src --out-dir . --presets @babel/preset-react
```
바벨 명령어를 더 살펴보자면, `--watch` src 디렉토리의 변경을 감지하면서 현재 `.` 디렉토리로 바벨 처리한 결과를 만들어내겠다.


위의 과정을 통해 JSX 문법이 hello-world 디렉토리에서 작성했던 코드와 동일한 문법으로 변경처리가 된다. 


## 3. 웹팩 기본 개념 이해하기

### 웹팩의 기능
- 파일 내용을 기반으로 파일 이름에 해시값을 추가해서  
- 효율적으로 브라우저 캐싱 이용이 가능
- 사용되지 않는 코드는 제거
- 자바스크립트 코드를 압축
- JS에서 CSS, JSON, 텍스트 파일을 일반 모듈처럼 불러올 수 있음
- 환경 변수 주입이 가능


웹사이트가 동적으로 변경되며 필요 자바스크립트 파일이 매우 많아졌는데, __기존에는__ 이를 관리하는데에 있어서 어려움이 있으며 선언된 자바스크립트 파일 순서에 따라 동작이 변경될 수 있고 CDN으로 작업 시 CDN서버 이상할 시 에러가 날 수 있다. 또한 여러 자바스크립트 파일에서 사용되는 변수의 충돌이 날 수 있다는 문제가 있었으며 이를 웹팩을 통해 해결해줄 수 있다. 



```
npm install webpack webpack-cli react react-dom

npx webpack
```

위의 작업을 완료하면 웹팩을 설치하고 dist 에 파일을 번들링시킨다.    


## 4. create-react-app 시작하기

```
npx create-react-app ${프로젝트명}
```

CRA 에서 사용되는 4개 명령어
```
npm start
HTTPS=true npm start
(윈도우용) set HTTPS=true && npm start // 실행해보니 제대로 작동하지는 않음....
```

```
npm run build
npx serve -s build
```


```
npm test
```

현재 파일의 설정을 고정시켜 수출하는 방식(최신 react-scripts 의 기능을 별도로 잡아줘야함)
```
npm eject
```


polyfill 을 통해 브라우저 호환성을 챙겨줄 수 있다.
caniuse.com 에서 함수가 브라우저에서 지원이 되는 지 알 수 있다. 


환경 변수를 보는 방법은  process.env.{변수명} 
```
process.env.NODE_ENV 
process.env.REACT_APP_API_URL 
```

환경변수를 위한 파일은 env.development, env.production 등의 각 서버 타입에 따라 파일로 만들 수 있다. 


## 5. CSS 작성 방법 결정하기

### 1. CSS 파일로 작성
별도의 CSS 파일을 만들어서 CSS 작성하기 
```
.big{
    width:200px; 
}
....

```

단점 : 이름이 충돌해서 build 시 마지막으로 선언된 속성이 적용이 되어 에러가 날 수 있다. 

### 2. CSS 모듈로 작성
```
.big{
    width:200px; 
}
....

```

다음의 모듈을 통해서 클래스네임을 쉽게 작성해줄 수 있음.
```
npm install classnames 
```

장점 : 이름 충돌의 단점을 해결할 수 있다. 각 모듈 내 객체에 해시값으로 이름 충돌이 나지 않게끔 도움 


### 3. SASS 로 작성

```
npm install node-sass
```

css 파일 이름은 scss로 작성해야함


### 4. CSS-IN-JS 로 작성

css 코드가 자바스크립트 코드 안에서 작성이 되므로 동적으로 css 작성하기도 쉽고 컴포넌트 내에 있으므로 한눈에 보기가 쉬움

```
npm install styled-components
```

```
import styled from 'syled-components';

const Button = styled.button`
    width: ;
`
```


## 6. SPA란?

단일 페이지 어플리케이션을 말한다.

SPA가 가능하기 위한 조건은 다음과 같다

1. 자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수 있다.

2. 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 

두 경우 모두 브라우저는 서버로 요청을 보내지 않아야 한다.

### SPA (자바스크립트와 브라우저)
위 조건을 만족시켜주는 브라우저 API가 있는데
- pushState, replaceState 함수
- popstate 이벤트

자바스크립트가 위의 함수를 통해 브라우저에게 페이지 전환 이벤트를 알려준다.

반대로 브라우저는 자바스크립트로 popstate 이벤트를 통해 변경될 것을 알려준다.

예제 코드는 다음의 위치에서 확인

[리액트 프로그래밍 -이재승님 github](https://github.com/landvibe/book-react/tree/master/1-chapter/7-router-test)

### react-router
```
npm install react-router-dom
```

리액트에서는 위의 react-router-dom 을 통해 쉽게 라우터를 구현할 수 있다.

```
<Route path="/rooms" component({Rooms})/> 
```

등으로 넘어오면 

컴포넌트에서는 match값을 받고 match.url 은 "/rooms"가 된다.
또한 `:roomId` 를 통해 넘어오는 변수를 사용하는 방법은
`match.params.roomId` 를 통해 path variable을 받을 수 있다.








