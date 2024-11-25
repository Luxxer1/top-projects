// getComputerChoice() randomly return
// "rock papper or scissors"
//
// getHumanChoice return one VALID humanChoice
// case insensitive
//
// create 2 variables humanScore and computerScore globaly
// initialized with 0
//
// function playRound takes 2 arguments: humanChoice and
// computer humanChoice
// console.log string representing the round winner
// increment winner count
//
// function playGame plays 5 rounds and calls playRound

const R = "rock", S = "scissors", P = "paper";

const choices = document.querySelectorAll("button");
const score = document.querySelector("#score");
const result = document.querySelector("#result");

let computerScore = 0, humanScore = 0;
let gameOver = false;

choices.forEach(choice => {
  choice.addEventListener("click", playGame);
});

function getComputerChoice() {
  randomNumber = Math.round(Math.random() * (3 - 1) + 1);
  switch (randomNumber) {
    case 1:
      return R;

    case 2:
      return S;

    case 3:
      return P;

    default:
      return console.error("Error, math randomly went wrong");
  }
}

function getHumanChoice(e) {
  return e.target.id;
}

function playRound(e) {
  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice(e);

  if (!gameOver) {
    if (computerChoice === humanChoice) {
      result.textContent = `Draw! Human and Computer chose ${humanChoice}`;
    } else if ((computerChoice === R && humanChoice === S) ||
              (computerChoice === P && humanChoice === R) ||
              (computerChoice === S && humanChoice === P)) {
      computerScore += 1;
      result.textContent = `You lose the round! ${computerChoice} beats ${humanChoice}`;
    } else {
      humanScore += 1;
      result.textContent = `You win the round! ${humanChoice} beats ${computerChoice}`;
    }
  }

  if (checkGameOver()) {
    printGameResult();
    choices.forEach(choice => {
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