import { clearDisplays, updateDisplay } from "./display.js";
import { operate } from "./calculator-core.js";

const calculator = {
  n1: "",
  operator: undefined,
  n2: "",
  result: undefined,
};

const clearCalculator = () => {
  clearDisplays();
  calculator.n1 = "";
  calculator.n2 = "";
  calculator.operator = undefined;
  calculator.result = undefined;
};

const canAppendDot = (...value) => {
  const dot = ".";

  return !value.every((v) => v.includes(dot));
};

const appendDigit = (digit) => {
  if (!calculator.operator) {
    canAppendDot(calculator.n1, digit) ? (calculator.n1 += digit) : "";
  } else {
    canAppendDot(calculator.n2, digit) ? (calculator.n2 += digit) : "";
  }
};

const evaluate = (operator = "=") => {
  if (operator != "=") {
    if (calculator.n1 && calculator.n2 && calculator.operator) {
      calculator.n1 = operate(
        calculator.operator,
        Number.parseFloat(calculator.n1),
        Number.parseFloat(calculator.n2)
      );
    }
  } else {
    if (calculator.n1 && parseFloat(calculator.n2) && calculator.operator) {
      calculator.result = operate(
        calculator.operator,
        Number.parseFloat(calculator.n1),
        Number.parseFloat(calculator.n2)
      );

      calculator.n1 = "";
      calculator.n2 = "";
      calculator.operator = undefined;
    }
  }
};

const appendOperator = (operator) => {
  // Append negative operator to digit
  if (
    (!calculator.operator && !calculator.n1 && operator == "-") ||
    (calculator.n1 &&
      (calculator.operator == "/" || calculator.operator == "*") &&
      operator == "-" &&
      !calculator.n2)
  ) {
    appendDigit(operator);
    return;
  }

  // Add operator to calculator
  if (!calculator.operator && parseFloat(calculator.n1)) {
    calculator.operator = operator;
    return;
  }

  // Change operator
  if (calculator.n1 && calculator.operator && !calculator.n2) {
    calculator.operator = operator;
    return;
  }

  // Evaluate operation
  if (calculator.n1 && calculator.operator && parseFloat(calculator.n2)) {
    evaluate(calculator.operator);
    calculator.n2 = "";
    calculator.operator = operator;
    return;
  }
};

const deleteLastDigit = (value) => {
  return value.slice(0, -1);
};

const handleBackspace = () => {
  if (calculator.n2) {
    calculator.n2 = deleteLastDigit(calculator.n2);
  } else if (calculator.operator) {
    calculator.operator = deleteLastDigit(calculator.operator);
  } else if (calculator.n1) {
    calculator.n1 = deleteLastDigit(calculator.n1);
  }
};

const identifyButton = (button) => {
  switch (button.className) {
    case "number":
      appendDigit(button.innerText);
      break;

    case "dot":
      appendDigit(button.innerText);
      break;

    case "operator":
      appendOperator(button.innerText);
      break;

    case "evaluator":
      evaluate();
      break;

    case "clear":
      clearCalculator();
      break;

    case "backspace":
      handleBackspace();
      break;

    default:
      break;
  }

  updateDisplay(calculator);

  // Handles behavior that prevents typing after calculation
  calculator.result = undefined;
};

///////////////////////////////////////////////////////////////////////

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    identifyButton(button);
    button.blur();
  });
});
