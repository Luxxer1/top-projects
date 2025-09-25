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

const printResult = () => {
  let stringResult = "";
  result;

  if (calculator.result) {
    stringResult = calculator.result;
  } else {
    for (let key in calculator) {
      if (calculator[key]) {
        stringResult += calculator[key] + " ";
      }
    }
  }

  clearHtml(digitDisplay);
  result.innerHTML = stringResult;
};

const hasNumberTyped = () => !!digitDisplay.innerHTML;

const defineNumber = (propName) => {
  calculator[propName] = +digitDisplay.innerText;
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
  } else if (calculator.operator && hasNumberTyped()) {
    defineNumber(SECONDNUMBER);
    calculator.result = calculate();
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

// const calculate = () => {
//   const result
// }

const evaluate = (button) => {
  switch (button.className) {
    case "operator":
      defineOperation(button.innerText);
      printResult();
      break;

    case "evaluate":
      if (!result.innerText || !digitDisplay.innerText) {
        digitDisplay.innerText = "Error, something is missing";
      } else {
        let [num1, op] = result.innerText.split(" ");
        calculator.secondNumber = +digitDisplay.innerText;
        calculator.firstNumber = operate(op, +num1, calculator.secondNumber);
        calculator.result = calculator.firstNumber;
        result.innerText = calculator.firstNumber;
        clearHtml(digitDisplay);
      }
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
