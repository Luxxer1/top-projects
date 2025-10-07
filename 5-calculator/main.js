const evaluationDisplay = document.getElementById("evaluationDisplay");
const resultDisplay = document.getElementById("resultDisplay");

///////////////////////////////////////////////////////////////////////

const calculator = {
  n1: undefined,
  n2: undefined,
  operator: undefined,
  result: undefined,
};

const appendDigit = (digit) => {
  evaluationDisplay.innerText += digit;
};

const clearCalculator = () => {
  evaluationDisplay.innerText = "";
  resultDisplay.innerText = "";
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
