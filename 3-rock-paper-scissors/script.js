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

const R = "rock", S = "scissors", P = "papper";

let computerScore = 0, humanScore = 0;

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

function getHumanChoice() {
  let humanChoice;
  while (true) {
    humanChoice = prompt("pick an option [rock, papper, scissors]: ").toLowerCase();
    if (humanChoice === R ||
        humanChoice === S ||
        humanChoice === P) {
      return humanChoice;
    }
  }
}

function playRound(getComputerChoice, getHumanChoice) {
  const computerChoice = getComputerChoice();
  const humanChoice = getHumanChoice();

  if (computerChoice === humanChoice) {
    console.log(`Draw! Human and Computer chose ${humanChoice}`)  
  } else if ((computerChoice === R && humanChoice === S) ||
             (computerChoice === P && humanChoice === R) ||
             (computerChoice === S && humanChoice === P)) {
    computerScore += 1;
    console.log(`You lose the round! ${computerChoice} beats ${humanChoice}`)
  } else {
    humanScore += 1;
    console.log(`You win the round! ${humanChoice} beats ${computerChoice}`)
  }
}

function playGame() {
  for (let i = 0; i < 5; i++) {
    playRound(getComputerChoice, getHumanChoice);
    console.log(`Human Score: ${humanScore}`);
    console.log(`Computer Score: ${computerScore}`);
    console.log("----------------------");
  }

  if (computerScore === humanScore) {
    console.log(`DRAW!`)
  } else if (computerScore > humanScore) {
    console.log(`YOU LOSE!`)
  } else {
    console.log(`CONGRATULATIONS, YOU WIN!!`)
  }
}

