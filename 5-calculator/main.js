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
  for (let key in calculator) {
    calculator[key] = undefined;
  }
};

const appendDigit = (digit) => {
  if (!calculator.operator) {
    calculator.n1 += digit;
  } else {
    calculator.n2 += digit;
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
  if (!calculator.operator && calculator.n1) {
    calculator.operator = operator;
    return;
  }

  // Change operator
  if (calculator.n1 && calculator.operator && !calculator.n2) {
    calculator.operator = operator;
  }
};

const evaluate = () => {
  if (calculator.n1 && calculator.n2 && calculator.operator) {
    calculator.result = operate(
      calculator.operator,
      Number.parseFloat(calculator.n1),
      Number.parseFloat(calculator.n2)
    );
  }
};

const identifyButton = (button) => {
  switch (button.className) {
    case "number":
      appendDigit(button.innerText);
      break;

    case "operator":
      appendOperator(button.innerText);

    case "evaluator":
      evaluate();
      break;

    case "clear":
      clearCalculator();
      break;

    default:
      break;
  }

  updateDisplay(calculator);
};

///////////////////////////////////////////////////////////////////////

document.querySelectorAll("#calculator > button").forEach((button) => {
  button.addEventListener("click", () => {
    identifyButton(button);
  });
});
