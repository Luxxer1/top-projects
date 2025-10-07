const evaluationDisplay = document.getElementById("evaluationDisplay");
const resultDisplay = document.getElementById("resultDisplay");

export const clearDisplays = () => {
  evaluationDisplay.innerHTML = "";
  resultDisplay.innerHTML = "";
};

export const updateDisplay = (calculator) => {
  let stringEvaluation = "";

  for (let key in calculator) {
    if (calculator[key]) {
      stringEvaluation += `${calculator[key]} `;
    }
  }

  evaluationDisplay.innerText = stringEvaluation;
};
