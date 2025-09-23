const display = document.getElementById("display");
const calculatorButtons = document.querySelectorAll("button");

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;

const operate = (operator, n1, n2) => {
  switch (operator) {
    case "+":
      return add(n1, n2);

    case "-":
      return subtract(n1, n2);

    case "*":
      return multiply(n1, n2);

    case "/":
      return divide(n1, n2);

    default:
      break;
  }
};
