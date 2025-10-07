const evaluationDisplay = document.getElementById("evaluationDisplay");
const resultDisplay = document.getElementById("resultDisplay");

export const clearDisplays = () => {
  evaluationDisplay.innerHTML = "";
  resultDisplay.innerHTML = "";
};

export const appendDigit = (digit) => {
  evaluationDisplay.innerText += digit;
};
