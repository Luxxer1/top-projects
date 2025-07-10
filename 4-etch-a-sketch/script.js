let container = document.getElementById("container");

const createGrid = (function () {
  return function (number) {
    for (let i = 1; i <= number; i++) {
      container.innerHTML += `Number ${i} `;
    }
  };
})();

createGrid(25);
