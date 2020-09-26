import React, {useState} from 'react';
import Title from './Title';

export default function Counter() {

    const [count, setCount] = useState(0);

    const [count2, setCount2] = useState(0);

    const [count3, setCount3] = useState({value:0});

    function onClick(){
        setCount(count+ 1);
    }

    // 렌더링에 영향이 없으므로 React.memo() 함수로 호출되어 렌더링이 불필요하게 일어나지 않는다.
    function onClick2(){
        setCount2(count2+ 1);
    }

    // 객체의 참조값만 변경된 경우에는 리액트입장에서 값이 변경되지 않았다고 생각한다.
    // 따라서 이를 불변 변수로 관리하기 위하여 전개연산자(스프레드) 를 이용한다.
    function onClick3(){
        // count3.value += 1;
        // setCount3(count3);
        setCount3({...count3, value: count3.value +1})
    }
    return (
        <div>
            <Title title={`현재 카운트: ${count}`} />            
            <Title title={`현재 카운트: ${count3.value}`} />          
            <button onClick={onClick}>증가</button>
            <button onClick={onClick3}>증가3</button>
        </div>  
    )      
}
