const etch = document.getElementById("etch");
const clear = document.getElementById("clear");
const container = document.getElementById("container");
let grid;

etch.addEventListener("click", () => {
  grid = prompt("Type the number of squares grid (Between 16 and 100)");

  if (isNaN(parseInt(grid))) {
    alert("Please, try again and insert a valid number");
    return;
  } else {
    grid = parseInt(grid);
  }

  if (grid < 16 || grid > 100) {
    alert("Please, try again and insert a number Between 16 and 100");
    return;
  }

  clearGrid();

  createGrid(grid);
});

clear.addEventListener("click", () => {
  clearGrid();
  console.log(grid);
  createGrid(grid);
});

const createGrid = (function () {
  return function (number = 16) {
    for (let i = 1; i <= number; i++) {
      for (let j = 1; j <= number; j++) {
        createSquare(number);
      }
    }
  };
})();

const createSquare = (number) => {
  const square = document.createElement("div");
  const maxSizePercentage = 100;
  const squareBase = maxSizePercentage / number;

  square.style.width = `${squareBase}%`;
  square.style.height = `${squareBase}%`;
  square.addEventListener(
    "mouseover",
    changeSquareBackground.bind(null, square)
  );

  container.appendChild(square);
};

const changeSquareBackground = (square) => {
  const red = getRandomRgbValue();
  const blue = getRandomRgbValue();
  const green = getRandomRgbValue();
  const opacity = 0.1;

  console.log(square.style.width);

  square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  square.style.opacity != ""
    ? (square.style.opacity = parseFloat(square.style.opacity) + opacity)
    : (square.style.opacity = opacity);
};

const getRandomRgbValue = () => {
  const min = 0;
  const max = 255;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clearGrid = () => {
  container.innerHTML = "";
};

createGrid();
