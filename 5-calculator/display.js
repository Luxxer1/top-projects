const evaluationDisplay = document.getElementById("evaluationDisplay");
const resultDisplay = document.getElementById("resultDisplay");

export const clearDisplays = () => {
  evaluationDisplay.innerHTML = "";
  resultDisplay.innerHTML = "";
};

const createDisplayString = (object) => {
  let string = "";

  for (let key in object) {
    if (object[key]) {
      string += `${object[key]} `;
    }
  }

  return string;
};

export const updateDisplay = (calculator) => {
  if (calculator.n1 && calculator.n2 && calculator.operator) {
    resultDisplay.innerText = createDisplayString(calculator);
  } else {
    evaluationDisplay.innerText = createDisplayString(calculator);
  }
};
