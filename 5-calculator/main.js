import { clearDisplays, updateDisplay } from "./display.js";
import { operate } from "./calculator-core.js";

const blurActiveElement = () => {
  const el = document.activeElement;
  if (el && el !== document.body) el.blur();
};

document.addEventListener("touchend", blurActiveElement, { passive: true });
document.addEventListener("touchcancel", blurActiveElement, { passive: true });
document.addEventListener("pointerup", blurActiveElement);

const calculator = {
  n1: "",
  operator: undefined,
  n2: "",
  result: undefined,
};

const clearCalculator = () => {
  clearDisplays();
  calculator.n1 = "";
  calculator.n2 = "";
  calculator.operator = undefined;
  calculator.result = undefined;
};

const canAppendDot = (...value) => {
  const dot = ".";

  return !value.every((v) => v.includes(dot));
};

const appendDigit = (digit) => {
  if (!calculator.operator) {
    canAppendDot(calculator.n1, digit) ? (calculator.n1 += digit) : "";
  } else {
    canAppendDot(calculator.n2, digit) ? (calculator.n2 += digit) : "";
  }
};

const evaluate = (operator = "=") => {
  if (operator != "=") {
    if (calculator.n1 && calculator.n2 && calculator.operator) {
      calculator.n1 = operate(
        calculator.operator,
        Number.parseFloat(calculator.n1),
        Number.parseFloat(calculator.n2)
      );
    }
  } else {
    if (calculator.n1 && calculator.n2 && calculator.operator) {
      calculator.result = operate(
        calculator.operator,
        Number.parseFloat(calculator.n1),
        Number.parseFloat(calculator.n2)
      );

      calculator.n1 = "";
      calculator.n2 = "";
      calculator.operator = undefined;
    }
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
  if (!calculator.operator && parseFloat(calculator.n1)) {
    calculator.operator = operator;
    return;
  }

  // Change operator
  if (calculator.n1 && calculator.operator && !calculator.n2) {
    calculator.operator = operator;
    return;
  }

  // Evaluate operation
  if (calculator.n1 && calculator.operator && parseFloat(calculator.n2)) {
    evaluate(calculator.operator);
    calculator.n2 = "";
    calculator.operator = operator;
    return;
  }
};

const deleteLastDigit = (value) => {
  return value.slice(0, -1);
};

const handleBackspace = () => {
  if (calculator.n2) {
    calculator.n2 = deleteLastDigit(calculator.n2);
  } else if (calculator.operator) {
    calculator.operator = deleteLastDigit(calculator.operator);
  } else if (calculator.n1) {
    calculator.n1 = deleteLastDigit(calculator.n1);
  }
};

const identifyClassName = (button) => {
  if (button.classList.contains("number")) return "number";
  if (button.classList.contains("dot")) return "dot";
  if (button.classList.contains("operator")) return "operator";
  if (button.classList.contains("evaluator")) return "evaluator";
  if (button.classList.contains("clear")) return "clear";
  if (button.classList.contains("backspace")) return "backspace";
};

const identifyButton = (button) => {
  const className = identifyClassName(button);

  switch (className) {
    case "number":
      appendDigit(button.innerText);
      break;

    case "dot":
      appendDigit(button.innerText);
      break;

    case "operator":
      appendOperator(button.innerText);
      break;

    case "evaluator":
      evaluate();
      break;

    case "clear":
      clearCalculator();
      break;

    case "backspace":
      handleBackspace();
      break;

    default:
      break;
  }

  updateDisplay(calculator);

  // Handles behavior that prevents typing after calculation
  calculator.result = undefined;
};

///////////////////////////////////////////////////////////////////////

const allowedKeys = {
  number: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  dot: ["."],
  operator: ["*", "+", "-", "/"],
  evaluator: ["=", "Enter"],
  clear: [" "],
  backspace: ["Backspace"],
};

const identifyKeyPressed = (key) => {
  for (const prop in allowedKeys) {
    if (allowedKeys[prop].includes(key)) {
      return { type: prop, value: key };
    }
  }
};

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("pointerdown", (e) => {
    identifyButton(button);
  });
});

document.addEventListener("keydown", (e) => {
  const keyDiv = document.createElement("div");
  const keyValues = identifyKeyPressed(e.key);
  keyDiv.className = keyValues.type;
  keyDiv.innerText = keyValues.value;
  identifyButton(keyDiv);
});
