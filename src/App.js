import "./App.css";
import { useEffect, useState } from "react";
import Decimal from "decimal.js";

function App() {
  const [firstCalcNumber, setFirstCalcNumber] = useState("");
  const [secondCalcNumber, setSecondCalcNumber] = useState("");

  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  const onClickNumber = (number) => {
    if (!operator) {
      setFirstCalcNumber([...firstCalcNumber, number].join(""));
    } else {
      setSecondCalcNumber([...secondCalcNumber, number].join(""));
    }
  };

  const onClickClear = () => {
    setOperator("");
    setFirstCalcNumber("");
    setSecondCalcNumber("");
    setResult("");
  };

  const checkOperator = () => {
    if (!operator) {
      alert("연산기호를 입력해 주세요");
    }
  };

  const checkDot = () => {
    if (!operator && !firstCalcNumber.includes(".") && firstCalcNumber !== "") {
      onClickNumber(".");
    }
    if (
      operator &&
      !secondCalcNumber.includes(".") &&
      secondCalcNumber !== ""
    ) {
      onClickNumber(".");
    }
  };

  const checkNumberZero = () => {
    if (!operator && firstCalcNumber !== "0") {
      onClickNumber("0");
    }
    if (operator && secondCalcNumber !== "0") {
      onClickNumber("0");
    }
  };

  const handleOperator = () => {
    let firstNumber = new Decimal(firstCalcNumber);
    if (operator === "+") {
      setResult(firstNumber.plus(secondCalcNumber));
    } else if (operator === "-") {
      setResult(firstNumber.minus(secondCalcNumber));
    } else if (operator === "X") {
      setResult(firstNumber.times(secondCalcNumber));
    } else if (operator === "/") {
      setResult(firstNumber.div(secondCalcNumber));
    }
    setOperator("");
    setSecondCalcNumber("");
  };

  const handleKeyboardOperator = (e) => {
    if (isFinite(e.key)) {
      onClickNumber(e.key);
    } else if (e.key === "+") {
      setOperator("+");
    } else if (e.key === "-") {
      setOperator("-");
    } else if (e.key === "*") {
      setOperator("X");
    } else if (e.key === "/") {
      setOperator("/");
    } else if (e.key === "Enter") {
      handleOperator();
    } else if (e.key === "Escape") {
      onClickClear();
    } else if (e.key === ".") {
      checkDot(e.key);
    }
  };

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
  }, [result]);

  useEffect(() => {
    if (result) {
      setFirstCalcNumber(result);
    }
  }, [result]);

  return (
    <>
      <div className="wrap" onKeyDown={handleKeyboardOperator}>
        <div className="number-view">
          <div className="view-number">
            <input
              className="view-number-title"
              readOnly="this.blur()"
              type="text"
              value={secondCalcNumber ? secondCalcNumber : firstCalcNumber}
            />
          </div>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("7");
            }}
          >
            7
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("8");
            }}
          >
            8
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("9");
            }}
          >
            9
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              setOperator("X");
            }}
          >
            X
          </button>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("4");
            }}
          >
            4
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("5");
            }}
          >
            5
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("6");
            }}
          >
            6
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              setOperator("-");
            }}
          >
            -
          </button>
        </div>
        <div className="numbers">
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("1");
            }}
          >
            1
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("2");
            }}
          >
            2
          </button>
          <button
            className="number-btn"
            onClick={() => {
              onClickNumber("3");
            }}
          >
            3
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              setOperator("+");
            }}
          >
            +
          </button>
        </div>
        <div className="numbers">
          <button className="number-btn orange-color" onClick={onClickClear}>
            AC
          </button>
          <button className="number-btn" onClick={checkNumberZero}>
            0
          </button>
          <button
            className="number-btn orange-color"
            onClick={() => {
              handleOperator();
              checkOperator();
            }}
          >
            =
          </button>
          <button
            className="number-btn-orange"
            onClick={() => {
              handleOperator();
              setOperator("/");
            }}
          >
            /
          </button>
        </div>
        <div className="numbers">
          <button className="number-btn-dot" onClick={checkDot}>
            .
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
