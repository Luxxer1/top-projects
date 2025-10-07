export function operate(operator, n1, n2) {
  switch (operator) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n2 === 0 ? "Can' divide by zero" : n1 / n2;
    default:
      return undefined;
  }
}
