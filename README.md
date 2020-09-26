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





