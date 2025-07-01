const human = document.getElementById("human");
const humanChoiceEl = human.getElementsByClassName("choice")[0];
const humanScoreEl = human.getElementsByClassName("score")[0];

const computer = document.getElementById("computer");
const computerChoiceEl = computer.getElementsByClassName("choice")[0];
const computerScoreEl = computer.getElementsByClassName("score")[0];

const roundCountEl = document.getElementById("roundCount");
const roundResultEl = document.getElementById("roundResult");

let computerScore, humanScore, roundCount;
let options = ["rock", "paper", "scissors"];
const [R, P, S] = options;
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
    roundCount = 0;
    computerScore = 0;
    computerScoreEl.innerHTML = computerScore;
    humanScore = 0;
    humanScoreEl.innerHTML = humanScore;
    printRound();
  }
}

function playRound(e) {
  if (!gameStarted) {
    alert("Please, start the game.");
    return;
  } else if (gameOver) {
    alert("Game is Over!");
    return;
  }

  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice(e);

  printChoices(computerChoice, humanChoice);

  if (!gameOver) {
    if (computerChoice === humanChoice) {
      roundResultEl.textContent = `Draw! Human and Computer chose ${capitalize(
        humanChoice
      )}`;
    } else if (
      (computerChoice === R && humanChoice === S) ||
      (computerChoice === P && humanChoice === R) ||
      (computerChoice === S && humanChoice === P)
    ) {
      computerScore += 1;
      roundResultEl.textContent = `You lost the round! ${capitalize(
        computerChoice
      )} beats ${capitalize(humanChoice)}`;
    } else {
      humanScore += 1;
      roundResultEl.textContent = `You won the round! ${capitalize(
        humanChoice
      )} beats ${capitalize(computerChoice)}`;
    }

    printRound();
    gameOver = checkGameOver();
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

function printRound() {
  roundCount += 1;
  roundCountEl.innerText = `Round ${roundCount}`;
  computerScoreEl.innerHTML = computerScore;
  humanScoreEl.innerText = humanScore;
}

function capitalize(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function checkGameOver() {
  if (humanScore == 5 || computerScore == 5) {
    return true;
  } else {
    return false;
  }
}
