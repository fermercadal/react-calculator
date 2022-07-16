import { useState } from "react";
import { operations, numbers } from "./data";

const Calculator = () => {
  const [lastPressed, setLastPressed] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [previousNumber, setPreviousNumber] = useState("");
  const [operation, setOperation] = useState("");

  const handleNumberClick = (e: any) => {
    const value = e.target.innerText;

    if (!Number.isNaN(Number(value))) {
      if (lastPressed === "=" && operation === "=") {
        setLastPressed(value);
        setCurrentNumber(value);
        setOperation("");
        setPreviousNumber("");
      } else {
        if (currentNumber === "0") {
          setLastPressed(value);
          setCurrentNumber(value);
        } else {
          setLastPressed(value);
          setCurrentNumber(currentNumber + value);
        }
      }
      return;
    }
  };

  const handleAcClick = (e: any) => {
    const value = e.target.innerText;

    setLastPressed(value);
    setCurrentNumber("0");
    setOperation("");
    setPreviousNumber("");
  };

  const handleDecimalClick = (e: any) => {
    const value = e.target.innerText;

    if (!currentNumber.includes(".")) {
      setCurrentNumber(currentNumber + value);
    }
  };

  const calculate = (operation: string) => {
    return Function(`"use strinct"; return (${operation})`)();
  };

  const handleOperationClick = (e: any) => {
    const value = e.target.innerText;
    var evaluated = "";

    switch (value) {
      case "=": {
        if (!operation) {
          return false;
        } else if (currentNumber === "-") {
          return false;
        } else if (lastPressed === "=" && operation === "=") {
          return false;
        } else {
          evaluated = calculate(
            `${previousNumber} ${operation} ${currentNumber}`
          );

          setLastPressed(value);
          setCurrentNumber(evaluated);
          setOperation(value);
          setPreviousNumber(`${previousNumber} ${operation}  ${currentNumber}`);
        }
        break;
      }

      case "*":
      case "/":
      case "+": {
        // If last pressed is equal, use result as first number
        if (lastPressed === "=" && operation === "=") {
          setLastPressed(value);
          setCurrentNumber("0");
          setOperation(value);
          setPreviousNumber(currentNumber);
        } else if (currentNumber === "0" && lastPressed !== "") {
          setLastPressed(value);
          setOperation(value);
        }
        // Pressing operation for the firt time
        else if (!operation) {
          setLastPressed(value);
          setCurrentNumber("0");
          setOperation(value);
          setPreviousNumber(currentNumber);
        } else if (currentNumber !== "-") {
          setLastPressed(value);
          setCurrentNumber("0");
          setOperation(value);
          setPreviousNumber(`${previousNumber} ${operation}  ${currentNumber}`);
        } else {
          setLastPressed(value);
          setCurrentNumber("0");
          setOperation(value);
        }
        break;
      }

      case "-": {
        if (lastPressed === "-") {
          return false;
        }
        if (currentNumber === "0") {
          setLastPressed(value);
          setCurrentNumber(value);
        } else {
          setLastPressed(value);
          setCurrentNumber("0");
          setOperation(value);
          setPreviousNumber(`${previousNumber} ${operation}  ${currentNumber}`);
        }
        break;
      }

      default: {
        return false;
      }
    }
  };

  const thisCurrent = currentNumber === "0" ? "" : currentNumber;
  const currentOperation =
    currentNumber === "0" && previousNumber === ""
      ? ""
      : `${previousNumber} ${operation}  ${thisCurrent}`;

  return (
    <>
      <div className="calculator-top">
        <h1>REACT.JS Calculator</h1>
        <section className="screen">
          <div className="currentOperation">{currentOperation}</div>
          <div className="display" id="display">
            {currentNumber}
          </div>
        </section>
      </div>

      <div className="calculator-buttons">
        <section className="numbers">
          <button className="ac" id="clear" onClick={handleAcClick}>
            AC
          </button>

          {numbers.map((number) => (
            <button
              className="btn__number"
              key={number.value}
              id={number.id}
              onClick={handleNumberClick}
            >
              {number.value}
            </button>
          ))}

          <button className="dot" id="decimal" onClick={handleDecimalClick}>
            .
          </button>

          <button className="equals" id="equals" onClick={handleOperationClick}>
            =
          </button>
        </section>

        <section className="operations">
          {operations.map((operation) => (
            <button
              className="btn__operation"
              key={operation.id}
              id={operation.id}
              onClick={handleOperationClick}
            >
              {operation.value}
            </button>
          ))}
        </section>
      </div>
    </>
  );
};

export default Calculator;
