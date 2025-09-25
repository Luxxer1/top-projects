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
  for (let key in calculator) calculator[key] = undefined;
};

const printResult = () => {
  let stringResult = "";

  if (calculator.result) {
    stringResult = calculator.result;
  } else {
    for (let key in calculator) {
      if (calculator[key]) {
        stringResult += calculator[key] + " ";
      }
    }
  }

  clearHtml(display);
  result.innerHTML = stringResult;
};

const hasNumberTyped = () => !!display.innerHTML;

const defineFirstNumber = () => {
  calculator.firstNumber = +display.innerText;
};

const defineSecondNumber = () => {
  calculator.secondNumber = +display.innerText;
};

const defineOperation = (operator) => {
  // Change operator sign
  if (calculator.firstNumber && !hasNumberTyped()) {
    calculator.operator = operator;
    return;
  }

  if (!calculator.operator && hasNumberTyped()) {
    calculator.operator = operator;
    defineFirstNumber();
    return;
  } else if (calculator.operator && hasNumberTyped()) {
    defineSecondNumber();
    calculator.result = operate(
      operator,
      calculator.firstNumber,
      calculator.secondNumber
    );
    // evaluate()
  }
};

//   if (resultCalculated) {
//     resultCalculated = undefined;
//     calculator.operator = operator;
//     calculator.firstNumber = +display.innerText;
//     result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
//     clearHtml(display);
//   } else {
//     calculator.secondNumber = +display.innerText;
//     let [num1, op] = result.innerText.split(" ");
//     calculator.firstNumber = operate(op, +num1, calculator.secondNumber);
//     calculator.operator = operator;
//     result.innerText = `${calculator.firstNumber} ${calculator.operator}`;
//     clearHtml(display);
//   }
// };

const evaluate = (button) => {
  switch (button.className) {
    case "operator":
      defineOperation(button.innerText);
      printResult();
      break;

    case "evaluate":
      if (!result.innerText || !display.innerText) {
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
  }
};

function refreshDisplay(button) {
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
