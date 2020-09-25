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
> 바벨 명령어를 더 살펴보자면, `--watch` src 디렉토리의 변경을 감지하면서 현재 `.` 디렉토리로 바벨 처리한 결과를 만들어내겠다.

위의 과정을 통해 JSX 문법이 hello-world 디렉토리에서 작성했던 코드와 동일한 문법으로 변경처리가 된다. 






