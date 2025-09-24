import { add, subtract, multiply, divide } from "./calculator.js";

const result = document.getElementById("result");
const display = document.getElementById("display");
const buttons = document.querySelectorAll("#calculator > button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    refreshDisplay(button);
  })
);

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
      break;

    case "operator":
      break;

    case "evaluate":
      break;

    case "clear":
      result.innerHTML += "";
      display.innerHTML += "";
      break;
  }
  // display.innerHTML += button.textContent;
}
