const human = document.getElementById("human");
const humanChoiceEl = human.getElementsByClassName("choice")[0];
const humanScoreEl = human.getElementsByClassName("score")[0];

const computer = document.getElementById("computer");
const computerChoiceEl = computer.getElementsByClassName("choice")[0];
const computerScoreEl = computer.getElementsByClassName("score")[0];

let computerScore = 0,
  humanScore = 0;
let options = ["rock", "paper", "scissors"];
let gameStarted = false;
let gameOver = true;

const choices = document.querySelectorAll(".choices");
choices.forEach((choice) => {
  choice.addEventListener("click", playRound);
});

const start = document.querySelector("#start");
start.addEventListener("click", startGame);

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    gameOver = false;
    computerScore = 0;
    computerScoreEl.innerHTML = computerScore;
    humanScore = 0;
    humanScoreEl.innerHTML = humanScore;
  }
}

function playRound(e) {
  if (!gameStarted) {
    alert("Please, start the game.");
    return;
  }

  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice(e);

  printChoices(computerChoice, humanChoice);

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
}

function getComputerChoice() {
  const randomNumber = Math.round(Math.random() * (3 - 1));

  return options[randomNumber];
}

function getHumanChoice(e) {
  return e.target.id;
}

function printChoices(computerChoice, humanChoice) {
  computerChoiceEl.innerHTML = `<img src="/assets/${computerChoice}.png" alt="${computerChoice}">`;

  humanChoiceEl.innerHTML = `<img src="/assets/${humanChoice}.png" alt="${humanChoice}">`;
}

function checkGameOver() {
  if (humanScore == 5 || computerScore == 5) {
    return true;
  } else {
    return false;
  }
}
