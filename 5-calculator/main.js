import { Calculator } from "./calculator-controller.js";
import { updateDisplay } from "./display.js";

const calc = new Calculator();

const resultDisplay = document.getElementById("resultDisplay");
const evaluationDisplay = document.getElementById("evaluationDisplay");

document.querySelectorAll("#calculator > button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.className === "number") {
      calc.appendDigit(button.innerText);
    } else if (button.className === "operator") {
      calc.setOperator(button.innerText);
    } else if (button.className === "evaluate") {
      calc.evaluate();
    } else if (button.className === "backspace") {
      calc.backspace();
    } else if (button.className === "clear") {
      calc.clear();
    }
    updateDisplay(calc, resultDisplay, evaluationDisplay);
  });
});

document.addEventListener("keydown", (event) => {
  handleKeyPress(event.key);
});

function handleKeyPress(key) {
  const operators = ["+", "-", "*", "/"];

  if (!isNaN(key) || key === ".") {
    if (key === "." && calc.inputBuffer.includes(".")) return;
    calc.appendDigit(key);
  } else if (operators.includes(key)) {
    calc.setOperator(key);
  } else if (key === "Enter" || key === "=") {
    calc.evaluate();
  } else if (key === "Backspace") {
    calc.backspace();
  } else if (key === "Escape") {
    calc.clear();
  }

  updateDisplay(calc, resultDisplay, evaluationDisplay);
}
