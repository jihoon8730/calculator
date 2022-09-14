import './App.css';
import { useState } from 'react';

function App() {
  const [numOne, setNumOne] = useState([]);
  const [numTwo, setNumTwo] = useState([]);
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
      setNumOne([...numOne , number]);
    } else {
      setNumTwo([...numTwo , number]);
    } 
  }

  //clear 함수
  const onClickClear = () => {
    setOperator('');
    setNumOne('');
    setNumTwo('');
    setResult('');
  }
  console.log(numOne, numTwo);
  console.log(result);
  return (
    <div className='wrap'>
      <div className='number-view'>
        <div className='view-number'>
          <div className='view-number-title'>
            {result ? result : operator ? numTwo : numOne}
          </div>
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
        <button className='number-btn' onClick={onClickClear}>C</button>
        <button className='number-btn' onClick={() => {
          onClickNumber('0');
        }}>0</button>

        <button className='number-btn' onClick={() => {
          // 나눗셈 관련 에러
          // 정확히 떨어지지 않는 수를 계산시 계산 불가
          // 해결 방안
          // 1. 소숫점을 두자리수 정도만 끊어내는 메소드? 필요함
          if (operator === '+') {
            return setResult(parseInt(numOne.join('')) + parseInt(numTwo.join('')));
          } else if (operator === '-') {
            return setResult(parseInt(numOne.join('')) - parseInt(numTwo.join('')));
          } else if (operator === 'X') {
            return setResult(parseInt(numOne.join('')) * parseInt(numTwo.join('')));
          } else if (operator === '/') {
            return setResult((parseInt(numOne.join(''))) / parseInt(numTwo.join(''))) ;
          } 
        }}>=</button>
        <button className='number-btn-orange' onClick={() => {
          setOperator('/');
          console.log(operator)
        }}>/</button>
      </div>
    </div>
  );
}
export default App;
