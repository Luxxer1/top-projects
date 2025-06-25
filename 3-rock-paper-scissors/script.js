const humanChoice = document
  .getElementById("human")
  .getElementsByClassName("choice")[0];

const computerChoice = document
  .getElementById("computer")
  .getElementsByClassName("choice")[0];

const choices = document.querySelectorAll(".choices");
const start = document.querySelector("#start");
start.addEventListener("click", startGame);

let computerScore = 0,
  humanScore = 0;
let R = "rock",
  P = "paper",
  S = "scissors";
let gameOver = false;

choices.forEach((choice) => {
  choice.addEventListener("click", getHumanChoice);
});

function getComputerChoice() {
  randomNumber = Math.round(Math.random() * (3 - 1) + 1);
  switch (randomNumber) {
    case 1:
      computerChoice.innerHTML = `<img src="/assets/${R}.png" alt="${R}">`;
      return R;

    case 2:
      computerChoice.innerHTML = `<img src="/assets/${P}.png" alt="${P}">`;
      return P;

    case 3:
      computerChoice.innerHTML = `<img src="/assets/${S}.png" alt="${S}">`;
      return S;

    default:
      return console.error("Error, math randomly went wrong");
  }
}

function startGame() {}

function getHumanChoice(e) {
  humanChoice.innerHTML = `<img src="/assets/${e.target.id}.png" alt="${e.target.id}">`;
  getComputerChoice();
  return e.target.id;
}

function playRound(e) {
  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice(e);

  if (!gameOver) {
    if (computerChoice === humanChoice) {
      result.textContent = `Draw! Human and Computer chose ${humanChoice}`;
    } else if (
      (computerChoice === R && humanChoice === S) ||
      (computerChoice === P && humanChoice === R) ||
      (computerChoice === S && humanChoice === P)
    ) {
      computerScore += 1;
      result.textContent = `You lose the round! ${computerChoice} beats ${humanChoice}`;
    } else {
      humanScore += 1;
      result.textContent = `You win the round! ${humanChoice} beats ${computerChoice}`;
    }
  }

  if (checkGameOver()) {
    printGameResult();
    choices.forEach((choice) => {
      choice.removeEventListener("click", playGame);
    });
  }
}

function playGame(e) {
  playRound(e);
  score.innerHTML = `Human Score: ${humanScore}<br>`;
  score.innerHTML += `Computer Score: ${computerScore}<br>`;
  score.innerHTML += "----------------------";
}

function printGameResult() {
  result.innerHTML += "<br>----------------------<br>";
  if (computerScore > humanScore) {
    result.innerHTML += `GAME OVER!`;
  } else {
    result.innerHTML += `CONGRATULATIONS, YOU WIN!!`;
  }
}

function checkGameOver() {
  if (humanScore == 5 || computerScore == 5) {
    return true;
  }
}
