import { add, subtract, multiply, divide } from "./calculator.js";
import { printNumber, clearHtml } from "./display.js";

const FIRSTNUMBER = "firstNumber";
const SECONDNUMBER = "secondNumber";

const calculator = {
  firstNumber: undefined,
  secondNumber: undefined,
  operator: undefined,
  result: undefined,
};

const resultDisplay = document.getElementById("resultDisplay");
const evaluationDisplay = document.getElementById("evaluationDisplay");
const digitDisplay = document.getElementById("digitDisplay");
const buttons = document.querySelectorAll("#calculator > button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    refreshDigitDisplay(button);
  })
);

const operate = (operate, firstNumber, secondNumber) => {
  switch (operate) {
    case "+":
      return add(firstNumber, secondNumber);

    case "-":
      return subtract(firstNumber, secondNumber);

    case "*":
      return multiply(firstNumber, secondNumber);

    case "/":
      return divide(firstNumber, secondNumber);
  }
};

const clearCalculator = () => {
  clearHtml(digitDisplay, evaluationDisplay);
  for (let key in calculator) calculator[key] = undefined;
};

const printEvaluation = () => {
  let stringResult = "";

  clearHtml(digitDisplay);

  if (calculator.result) {
    stringResult = calculator.result;
    resultDisplay.innerHTML = stringResult;
    return;
  } else {
    for (let key in calculator) {
      if (calculator[key]) {
        stringResult += calculator[key] + " ";
      }
    }
  }

  evaluationDisplay.innerHTML = stringResult;
};

const hasNumberTyped = () => !!digitDisplay.innerHTML;

const defineNumber = (propName) => {
  calculator[propName] = +digitDisplay.innerText;
};

function checkValidEvaluation(operator = undefined) {
  const divide = "/";
  const zero = 0;

  if (operator == divide && calculator.secondNumber == zero) {
    // something here
  }
}

const calculate = () => {
  // checkValidEvaluation();
  // find a way to handle error
  const result = operate(
    calculator.operator,
    calculator.firstNumber,
    calculator.secondNumber
  );

  if (calculator.operator == "=") {
    clearCalculator();
  }

  return result;
};

const defineOperation = (operator) => {
  // Change operator sign
  if (calculator.firstNumber && !hasNumberTyped()) {
    calculator.operator = operator;
    return;
  }

  if (!calculator.operator && hasNumberTyped()) {
    calculator.operator = operator;
    defineNumber(FIRSTNUMBER);
    return;
  } else if (
    calculator.operator &&
    calculator.firstNumber &&
    hasNumberTyped()
  ) {
    defineNumber(SECONDNUMBER);
    calculator.firstNumber = calculate();
    calculator.secondNumber = undefined;
  }
};

const evaluate = (button) => {
  switch (button.className) {
    case "operator":
      defineOperation(button.innerText);
      calculator.operator = button.innerText;
      printEvaluation();
      break;

    case "evaluate":
      break;
  }
};

function refreshDigitDisplay(button) {
  switch (button.className) {
    case "clear":
      clearCalculator();
      break;

    case "number":
      printNumber(button.innerText);
      break;

    case "operator" || "evaluate":
      evaluate(button);
      break;
  }
}
