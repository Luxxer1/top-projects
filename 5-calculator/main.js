import { clearDisplays, appendDigit } from "./display.js";

const calculator = {
  n1: undefined,
  n2: undefined,
  operator: undefined,
  result: undefined,
};

const clearCalculator = () => {
  clearDisplays();
  for (let key in calculator) {
    calculator[key] = undefined;
  }
};

const identifyButton = (button) => {
  switch (button.className) {
    case "number":
      appendDigit(button.innerText);
      break;

    case "clear":
      clearCalculator();
      break;

    default:
      break;
  }
};

///////////////////////////////////////////////////////////////////////

document.querySelectorAll("#calculator > button").forEach((button) => {
  button.addEventListener("click", () => {
    identifyButton(button);
  });
});
