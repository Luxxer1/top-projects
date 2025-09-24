import { add, subtract, multiply, divide } from "./calculator.js";

const result = document.getElementById("result");
const display = document.getElementById("display");

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
