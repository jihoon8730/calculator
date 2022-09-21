import './App.css';
import {  useEffect, useState } from 'react';
import Decimal from 'decimal.js';
// import Big from 'big.js';

function App() {

  const [firstCalcNumber, setFirstCalcNumber] = useState('');
  const [secondCalcNumber, setSecondCalcNumber] = useState('');
  
  // 연산자 state
  const [operator, setOperator] = useState('');

  // 결과값 state
  const [result, setResult] = useState('');
  
  // 숫자값 state
  const onClickNumber = (number) => {
    if (!operator) {
      setFirstCalcNumber([...firstCalcNumber , number].join(''));
    } else {
      setSecondCalcNumber([...secondCalcNumber , number].join(''));
    }
  }

  //clear 함수
  const onClickClear = () => {
    setOperator('');
    setFirstCalcNumber('');
    setSecondCalcNumber('');
    setResult('');
  }

  const checkOperator = () => {
    if (!operator) {
      alert("연산기호를 입력해 주세요");
    }
  }

  const checkDot = () => {
    if ((!operator && !firstCalcNumber.includes('.')) && (firstCalcNumber !== '')) {
      onClickNumber('.');
    }
    if ((operator && !secondCalcNumber.includes('.')) && (secondCalcNumber !== '')) {
      onClickNumber('.');
    }
  }

  const checkNumberZero = () => {
    if ((!operator && firstCalcNumber !== '0')) {
      onClickNumber('0');
    }
    if ((operator && secondCalcNumber !== '0')) {
      onClickNumber('0');
    }
  }
  
  // 정확한 계산을 위해 실수 계산을 할때에는 Math.ceil()같은 메소드를 사용하거나 정수로 변환을 하여 사용하는게 좋다
  // 예시) 0.100000000000와 같은 부정확한 계산을 해야할때는 toFixed()와 같이 어림수를 만들어 줘야 한다 .. 모던 자바스크립트
  // toFixed()사용시 문자열(string)으로 출력 되고 반올림 
  const handleOperator = () => {
    let firstNumber = new Decimal(firstCalcNumber);
    if (operator === '+') {
      setResult(firstNumber.plus(secondCalcNumber));
    } else if (operator === '-') {
      setResult(firstNumber.minus(secondCalcNumber));
    } else if (operator === 'X') {
      setResult(firstNumber.times(secondCalcNumber));
    } else if (operator === '/') {
      setResult(firstNumber.div(secondCalcNumber));
    }
      setOperator('');
      setSecondCalcNumber(''); 
  }

  useEffect(() => {
    console.log(result);
  }, [result])

  const handleKeyboardOperator = (e) => {
    if (isFinite(e.key)) {
      onClickNumber(e.key);
    } else if (e.key === '+') {
      setOperator('+');
    } else if (e.key === '-') {
      setOperator('-');
    } else if (e.key === '*') {
      setOperator('X');
    } else if (e.key === '/') {
      setOperator('/');
    } else if (e.key === 'Enter') {
      handleOperator();
    } else if (e.key === 'Escape') {
      onClickClear();
    } else if (e.key === '.') {
      checkDot(e.key);
    }
    
  }

  useEffect(() => {
    if (result === 0) {
      alert("결과가 0 입니다");
      onClickClear();
    } 
    if (result === Infinity) {
      alert("숫자값이 아닙니다");
      onClickClear();
    }
    if (isNaN(result) === true) {
      onClickClear();
      alert("숫자값이 아닙니다");
    }
  },[result]);

  useEffect(() => {
    console.log("result: ", result);
    if (result) {
      setFirstCalcNumber(result);
    }
  }, [result])

  // useEffect(() => {
  //   console.log("firstCalcNumber: ", firstCalcNumber, "secondCalcNumber: " , secondCalcNumber, "operator", operator);
  // }, []);

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

  return (
    <>
    <div className="wrap" onKeyDown={handleKeyboardOperator}>
      <div className='number-view'>
        <div className='view-number'>
          <input className='view-number-title' readOnly="this.blur()" type="text" value={secondCalcNumber ? secondCalcNumber : firstCalcNumber} />
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
          handleOperator()
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
          handleOperator()
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
          handleOperator();
          setOperator('+');
        }}>+</button>
      </div>
      <div className='numbers'>
        <button className='number-btn orange-color' onClick={onClickClear}>AC</button>
        <button className='number-btn' onClick={checkNumberZero}>0</button>
        <button className='number-btn orange-color' onClick={() => {
          handleOperator()
          checkOperator();
          }}>=</button>
        <button className='number-btn-orange' onClick={() => {
          handleOperator();
          setOperator('/');
        }}>/</button>
      </div>
      <div className='numbers'>
      <button className='number-btn-dot' onClick={checkDot}>.</button>
      </div>
    </div>
    </>
  );
}
export default App;
