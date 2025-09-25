export const printNumber = (number) => (display.innerHTML += number);

export const clearHtml = (...objectHtml) =>
  objectHtml.forEach((object) => (object.innerHTML = ""));
