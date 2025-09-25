import { add, subtract, multiply, divide } from "./calculator.js";
import { printNumber, clearHtml } from "./display.js";

const calculator = {
  firstNumber: undefined,
  secondNumber: undefined,
  operator: undefined,
  result: undefined,
};

const result = document.getElementById("result");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator > button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    refreshDisplay(button);
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
  clearHtml(display, result);
  for (key in calculator) calculator[key] = undefined;
};

const checkOperator = (button) => {
  if (!calculator.operator) {
    calculator.firstNumber = +display.innerText;
    calculator.operator = button.innerText;
    result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
    clearHtml(display);
  } else {
    if (display.innerText == "") {
      calculator.operator = button.innerText;
      result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
      clearHtml(display);
    } else {
      if (resultCalculated) {
        resultCalculated = undefined;
        calculator.operator = button.innerText;
        calculator.firstNumber = +display.innerText;
        result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
        clearHtml(display);
      } else {
        calculator.secondNumber = +display.innerText;
        let [num1, op] = result.innerText.split(" ");
        calculator.firstNumber = operate(op, +num1, calculator.secondNumber);
        operator = button.innerText;
        result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
        clearHtml(display);
      }
    }
  }
};

function refreshDisplay(button) {
  switch (button.className) {
    case "number":
      printNumber(button.innerText);
      break;

    case "operator":
      checkOperator(button);

      break;

    case "evaluate":
      if (result.innerText == "" || display.innerText == "") {
        display.innerText = "Error, something is missing";
      } else {
        let [num1, op] = result.innerText.split(" ");
        calculator.secondNumber = +display.innerText;
        calculator.firstNumber = operate(op, +num1, calculator.secondNumber);
        calculator.result = calculator.firstNumber;
        result.innerText = calculator.firstNumber;
        clearHtml(display);
      }
      break;

    case "clear":
      clearCalculator();
      break;
  }
}
