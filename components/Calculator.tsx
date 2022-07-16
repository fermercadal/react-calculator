import { useReducer } from "react";
import { operations, numbers } from "./data";
import { instructionsReducer } from "./machine";

const Calculator = () => {
  const initialState = {
    previousNumber: "",
    lastPressed: "",
    currentNumber: "",
    operation: "",
  };

  const [state, dispatch] = useReducer(instructionsReducer, initialState);

  const handleNumberPress = (e: any) => {
    const value = e.target.innerText;

    if (!Number.isNaN(Number(value))) {
      if (state.lastPressed === "=" && state.operation === "=") {
        dispatch({
          type: "FIRST_NUMBER",
          payload: value,
        });
      } else {
        if (state.currentNumber === "0") {
          dispatch({
            type: "ADD_NUMBER_TO_ZERO",
            payload: value,
          });
        } else {
          dispatch({
            type: "ADD_NUMBER",
            payload: value,
          });
        }
      }
      return;
    }
  };

  const handleAcPress = (e: any) => {
    const value = e.target.innerText;

    dispatch({
      type: "AC",
      payload: value,
    });
  };

  const handleDecimalPress = (e: any) => {
    const value = e.target.innerText;

    if (!state.currentNumber.includes(".")) {
      dispatch({
        type: "ADD_DECIMAL",
        payload: value,
      });
    }
  };

  const handleOperationPress = (e: any) => {
    const value = e.target.innerText;

    switch (value) {
      case "=": {
        if (!state.operation) {
          return false;
        } else if (state.currentNumber === "-") {
          return false;
        } else if (state.lastPressed === "=" && state.operation === "=") {
          return false;
        } else {
          dispatch({
            type: "EQUAL",
            payload: value,
          });
        }
        break;
      }

      case "*":
      case "/":
      case "+": {
        if (state.lastPressed === "=" && state.operation === "=") {
          dispatch({
            type: "OPERATION_FIRST_TIME",
            payload: value,
          });
        } else if (state.currentNumber === "0" && state.lastPressed !== "") {
          dispatch({
            type: "OPERATION_AFTER_ZERO",
            payload: value,
          });
        } else if (!state.operation) {
          dispatch({
            type: "OPERATION_FIRST_TIME",
            payload: value,
          });
        } else if (state.currentNumber !== "-") {
          dispatch({
            type: "PREPARE_OPERATION",
            payload: value,
          });
        } else {
          dispatch({
            type: "OPERATION",
            payload: value,
          });
        }
        break;
      }

      case "-": {
        if (state.lastPressed === "-") {
          return false;
        }
        if (state.currentNumber === "0") {
          dispatch({
            type: "SUST_AFTER_ZERO",
            payload: value,
          });
        } else {
          dispatch({
            type: "PREPARE_OPERATION",
            payload: value,
          });
        }
        break;
      }

      default: {
        return false;
      }
    }
  };

  const thisCurrent = state.currentNumber === "0" ? "" : state.currentNumber;

  const currentOperation =
    state.currentNumber === "0" && state.previousNumber === ""
      ? ""
      : `${state.previousNumber} ${state.operation}  ${thisCurrent}`;

  return (
    <>
      <div className="calculator-top">
        <h1>REACT.JS Calculator</h1>
        <section className="screen">
          <div className="currentOperation">{currentOperation}</div>
          <div className="display" id="display">
            {state.currentNumber}
          </div>
        </section>
      </div>

      <div className="calculator-buttons">
        <section className="numbers">
          <button className="ac" id="clear" onClick={handleAcPress}>
            AC
          </button>

          {numbers.map((number) => (
            <button
              className="btn__number"
              key={number.value}
              id={number.id}
              onClick={handleNumberPress}
            >
              {number.value}
            </button>
          ))}

          <button className="dot" id="decimal" onClick={handleDecimalPress}>
            .
          </button>

          <button className="equals" id="equals" onClick={handleOperationPress}>
            =
          </button>
        </section>

        <section className="operations">
          {operations.map((operation) => (
            <button
              className="btn__operation"
              key={operation.id}
              id={operation.id}
              onClick={handleOperationPress}
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
