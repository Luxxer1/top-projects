export function updateDisplay(calculator, resultDisplay, evaluationDisplay) {
  if (calculator.result !== undefined) {
    resultDisplay.innerText = calculator.result;
  } else {
    resultDisplay.innerText = "";
  }

  let evalStr = "";
  if (calculator.firstNumber !== undefined)
    evalStr += calculator.firstNumber + " ";
  if (calculator.operator) evalStr += calculator.operator + " ";
  if (calculator.inputBuffer) evalStr += calculator.inputBuffer;

  evaluationDisplay.innerText = evalStr.trim();
}
