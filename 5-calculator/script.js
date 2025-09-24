import { add, subtract, multiply, divide } from "./calculator.js";

let operator, n1, n2, resultCalculated;

const result = document.getElementById("result");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator > button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    refreshDisplay(button);
  })
);

const clearDisplay = () => (display.innerHTML = "");

const operate = (operate, n1, n2) => {
  switch (operate) {
    case "+":
      return add(n1, n2);

    case "-":
      return subtract(n1, n2);

    case "*":
      return multiply(n1, n2);

    case "/":
      return divide(n1, n2);
  }
};

function refreshDisplay(button) {
  switch (button.className) {
    case "number":
      display.innerText += button.innerText;
      break;

    case "operator":
      if (!operator) {
        n1 = +display.innerText;
        operator = button.innerText;
        result.innerText = `${n1} ${operator}`;
        clearDisplay();
      } else {
        if (display.innerText == "") {
          operator = button.innerText;
          result.innerText = `${n1} ${operator}`;
          clearDisplay();
        } else {
          if (resultCalculated) {
            resultCalculated = undefined;
            operator = button.innerText;
            n1 = +display.innerText;
            result.innerText = `${n1} ${operator}`;
            clearDisplay();
          } else {
            n2 = +display.innerText;
            let [num1, op] = result.innerText.split(" ");
            n1 = operate(op, +num1, n2);
            operator = button.innerText;
            result.innerText = `${n1} ${operator}`;
            clearDisplay();
          }
        }
      }

      break;

    case "evaluate":
      if (result.innerText == "" || display.innerText == "") {
        display.innerText = "Error, something is missing";
      } else {
        let [num1, op] = result.innerText.split(" ");
        n2 = +display.innerText;
        n1 = operate(op, +num1, n2);
        resultCalculated = n1;
        result.innerText = n1;
        clearDisplay();
      }
      break;

    case "clear":
      result.innerHTML = "";
      clearDisplay();
      n1 = undefined;
      n2 = undefined;
      operator = undefined;
      resultCalculated = undefined;
      break;
  }
}
