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

const identifyButton = (button) => {
  switch (button.className) {
    case "number":
      appendDigit(button.innerText);
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
