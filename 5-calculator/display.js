export const printNumber = (number) => (digitDisplay.innerHTML += number);

export const clearHtml = (...objectHtml) =>
  objectHtml.forEach((object) => (object.innerHTML = ""));
