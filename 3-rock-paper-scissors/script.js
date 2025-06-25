const human = document.getElementById("human");
const humanChoice = human.getElementsByClassName("choice")[0];
const humanScoreEl = human.getElementsByClassName("score")[0];

const computer = document.getElementById("computer");
const computerChoice = computer.getElementsByClassName("choice")[0];
const computerScoreEl = computer.getElementsByClassName("score")[0];

let computerScore = 0,
  humanScore = 0;
let options = ["rock", "paper", "scissors"];
let gameStarted = false;

const choices = document.querySelectorAll(".choices");
choices.forEach((choice) => {
  choice.addEventListener("click", getHumanChoice);
});

const start = document.querySelector("#start");
start.addEventListener("click", "");

function getComputerChoice() {
  const randomNumber = Math.round(Math.random() * (3 - 1));
  const randomChoice = options[randomNumber];

  // computerChoice.innerHTML = `<img src="/assets/${randomChoice}.png" alt="${randomChoice}">`;

  return randomChoice;
}

function getHumanChoice(e) {
  // humanChoice.innerHTML = `<img src="/assets/${e.target.id}.png" alt="${e.target.id}">`;
  if (gameStarted) {
    return e.target.id;
  } else {
    alert("Please, start the game.");
  }
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
