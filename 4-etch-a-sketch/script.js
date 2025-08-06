const container = document.getElementById("container");

const createGrid = (function () {
  return function (number) {
    for (let i = 1; i <= number; i++) {
      createSquare(); 
    }
  };
})();

const createSquare = () => {
  const square = document.createElement("div");

  square.setAttribute("class", "square");
  square.addEventListener("mouseover", changeSquareBackground.bind(null, square));

  container.appendChild(square);
}

const changeSquareBackground = (square) => {
  const red = getRandomRgbValue();
  const blue = getRandomRgbValue();
  const green = getRandomRgbValue();
  const opacity = 0.1;

  square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  square.style.opacity != "" ?
    square.style.opacity = parseFloat(square.style.opacity) + opacity :
    square.style.opacity = opacity;
}

const getRandomRgbValue = () => {
  const min = 0;
  const max = 255;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

createGrid(200);
