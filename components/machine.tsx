const calculate = (operation: string) => {
  return Function(`"use strinct"; return (${operation})`)();
};

export const instructionsReducer = (state, action) => {
  switch (action.type) {
    case "AC":
      return {
        previousNumber: "",
        lastPressed: action.payload,
        currentNumber: "0",
        operation: "",
      };
    case "FIRST_NUMBER":
      return {
        previousNumber: "",
        lastPressed: action.payload,
        currentNumber: action.payload,
        operation: "",
      };
    case "ADD_NUMBER":
      return {
        ...state,
        lastPressed: action.payload,
        currentNumber: `${state.currentNumber}${action.payload}`,
      };
    case "ADD_NUMBER_TO_ZERO":
      return {
        ...state,
        lastPressed: action.payload,
        currentNumber: action.payload,
      };
    case "ADD_DECIMAL":
      return {
        ...state,
        currentNumber: `${state.currentNumber}${action.payload}`,
      };
    case "EQUAL":
      const evaluated = calculate(
        `${state.previousNumber} ${state.operation} ${state.currentNumber}`
      );

      return {
        previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`,
        lastPressed: action.payload,
        currentNumber: evaluated,
        operation: action.payload,
      };
    case "OPERATION_FIRST_TIME":
      return {
        previousNumber: state.currentNumber,
        lastPressed: action.payload,
        currentNumber: "0",
        operation: action.payload,
      };
    case "OPERATION_AFTER_ZERO":
      return {
        ...state,
        lastPressed: action.payload,
        operation: action.payload,
      };
    case "PREPARE_OPERATION":
      return {
        previousNumber: `${state.previousNumber} ${state.operation} ${state.currentNumber}`,
        lastPressed: action.payload,
        currentNumber: "0",
        operation: action.payload,
      };
    case "OPERATION":
      return {
        ...state,
        lastPressed: action.payload,
        currentNumber: "0",
        operation: action.payload,
      };
    case "SUST_AFTER_ZERO":
      return {
        ...state,
        lastPressed: action.payload,
        currentNumber: action.payload,
      };

    default:
      throw new Error();
  }
};
