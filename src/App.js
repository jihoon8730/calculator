import './App.css';
import {  useEffect, useState } from 'react';

function App() {

  const [numOne, setNumOne] = useState('');
  const [numTwo, setNumTwo] = useState('');
  // State에 버튼1 클릭하면 numOwn배열안에 1값이 push
  // 버튼1 클릭하면 numOwn배열안에 1값이 push
  // 버튼2 클릭하면 numOwn배열안에 2값이 push
  // 버튼3 클릭하면 numOwn배열안에 3값이 push

  // 연산자 state
  const [operator, setOperator] = useState();

  // 결과값 state
  const [result, setResult] = useState();
  
  // 숫자값 state
  const onClickNumber = (number) => {
    if (!operator) {
      setNumOne([...numOne , number].join(''));
    } else {
      setNumTwo([...numTwo , number].join(''));
    } 
  }

  //clear 함수
  const onClickClear = () => {
    setOperator('');
    setNumOne('');
    setNumTwo('');
    setResult('');
  }

  const handleOperator = () => {
    if (operator === '+') {
      setResult(Math.round((parseFloat(numOne) + parseFloat(numTwo)) * 100) / 100);
    } else if (operator === '-') {
      setResult(Math.round((parseFloat(numOne) - parseFloat(numTwo)) * 100) / 100);
    } else if (operator === 'X') {
      setResult(parseFloat(numOne) * parseFloat(numTwo));
    } else if (operator === '/') {
      setResult((parseFloat(numOne) / parseFloat(numTwo)).toFixed(2));
    }
      setNumOne(result);
      setOperator('');
      setNumTwo(''); 
  }
  console.log("numOne: ", numOne, "numTwo: ", numTwo);
  console.log("result: ",result);
  
  
  
  

  // 계산식 여러번 작성하기 순서도
  // 계산순서 (숫자 => 연산자 => 숫자 => 연산자 => 결과값 => 숫자 => 연산자 => 결과값 => 숫자 => 연산자 => 결과값)
  // 1. 숫자 버튼을 클릭하면 숫자의 value를 state에 담기
  // 2. 연산자 클릭시 연산자 value를 state에 담기
  // 3. 숫자 클릭시 숫자의 value를 숫자2 state에 담기
  // 4. 연산자 클릭시 숫자1 + 숫자2 결과값 result state에 담기


  //debouncing 예제 코드 작성 중
  //   useEffect(() => {
  //     let timer = setTimeout(() => {
  //       onClickNumber('.');
  //     }, 300);
  //     return () => {clearTimeout(timer)}
  //   }, [])
  // }
  

  // 키보드 숫자패드 입력하기
  // ------순서 정리-----
  // 1. 키보드를 누를 때
  // - 키보드 넘버 1을 누르면 onClickNumber('1')이 들어간다
  // - 키보드 넘버 2을 누르면 onClickNumber('2')이 들어간다
  // - 키보드 넘버 3을 누르면 onClickNumber('3')이 들어간다
  // 2. keyboard value를 가져온다
  // - key와 관련된 이벤트 사용(onkeydown, onkeyup 등등) 
  // - keyboard를 눌렀을때 keyvalue를 가져 올 수 있는 메소드 사용 = event.key를 사용하여 onkeyDown을 했을 때 내가 누른 key의 value 값을 가져옴
  // - console.log로 확인
  // -----해결 방안------
  // 1. 계산기 창에 클릭 했을 때 event key value를 가져온다
  // 2. 가져온 key value를 isFinite()를 통해 숫자만 추출 검사한다
  // 3. e.key가 숫자일 경우 onClickNumber(e.key)를, 그 외의 경우 false
  // 4. 마찬가지로 연산기호의 경우도 e.key가 문자열타입의 연산자일 경우 operator State에 담는다
  // 5. 엔터 키보드를 누를시 결과값 출력
  // 6. ESC 키보드를 누를시 onClickClear함수 실행
  // 7. 소수점 계산 기능 추가 
  // ----문제점-----
  // 소수점이 하나만 찍혀야 하지만 현제 버튼을 클릭할때마다 눌리고 있다
  // 해결하기 위해 cto님 trottleling, debouncing개념의 키워드를 주셨다
  // 현재 접목해야할 개념으로는 debouncing(디바운싱)

  const handleKeyboardOperator = (e) => {
    if (isFinite(e.key)) {
      return onClickNumber(e.key);
    } else if (e.key === '+') {
      return setOperator('+');
    } else if (e.key === '-') {
      return setOperator('-');
    } else if (e.key === '*') {
      return setOperator('X');
    } else if (e.key === '/') {
      return setOperator('/');
    } else if (e.key === 'Enter') {
      return handleOperator();
    } else if (e.key === 'Escape') {
      return onClickClear();
    } else if (e.key === '.') {
      return onClickNumber(e.key);
    }
  }
  return (
    <div className='wrap' onKeyDown={handleKeyboardOperator}>
      <div className='number-view'>
        <div className='view-number'>
          <input className='view-number-title' readOnly="this.blur()" type="text" value={result ? result : operator ? numTwo : numOne} />
        </div>
      </div>
      <div className='numbers'>
        <button className='number-btn' onClick={() => {
          onClickNumber('7');
        }}>7</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('8');
        }}>8</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('9');
        }}>9</button>
        <button className='number-btn-orange' onClick={() => {
          setOperator('X');
        }}>X</button>
      </div>
      <div className='numbers'>
        <button className='number-btn' onClick={() => {
          onClickNumber('4');
        }}>4</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('5');
        }}>5</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('6');
        }}>6</button>
        <button className='number-btn-orange' onClick={() => {
          setOperator('-');
        }}>-</button>
      </div>
      <div className='numbers'>
        <button className='number-btn' onClick={() => {
          onClickNumber('1');
        }}>1</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('2');
        }}>2</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('3');
        }}>3</button>
        <button className='number-btn-orange' onClick={() => {
          setOperator('+');
        }}>+</button>
      </div>
      <div className='numbers'>
        <button className='number-btn orange-color' onClick={onClickClear}>AC</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('0');
        }}>0</button>

        <button className='number-btn orange-color' onClick={handleOperator}>=</button>
        <button className='number-btn-orange' onClick={() => {
          setOperator('/');
        }}>/</button>
      </div>
      <div className='numbers'>
      <button className='number-btn-dot' onClick={() => {
        onClickNumber('.');
      }}>.</button>
      </div>
    </div>
  );
}
export default App;
