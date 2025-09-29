import { operate } from "./calculator-core.js";

export class Calculator {
  constructor() {
    this.firstNumber = undefined;
    this.secondNumber = undefined;
    this.operator = undefined;
    this.result = undefined;
    this.inputBuffer = "";
  }

  appendDigit(digit) {
    this.inputBuffer += digit;
  }

  setOperator(operator) {
    if (this.firstNumber === undefined && this.inputBuffer !== "") {
      this.firstNumber = parseFloat(this.inputBuffer);
      this.inputBuffer = "";
      this.operator = operator;
      return;
    }

    if (
      this.firstNumber !== undefined &&
      this.operator &&
      this.inputBuffer !== ""
    ) {
      this.secondNumber = parseFloat(this.inputBuffer);

      const res = operate(this.operator, this.firstNumber, this.secondNumber);
      this.result = res;

      if (Number.isFinite(res)) {
        this.firstNumber = res;
        this.secondNumber = undefined;
      } else {
        this.clear();
        this.result = res;
      }

      this.inputBuffer = "";
      this.operator = operator;
      return;
    }

    if (this.firstNumber !== undefined && this.inputBuffer === "") {
      this.operator = operator;
      return;
    }
  }

  evaluate() {
    if (this.inputBuffer !== "") {
      this.secondNumber = parseFloat(this.inputBuffer);
    }
    this.result = operate(this.operator, this.firstNumber, this.secondNumber);

    if (Number.isFinite(this.result)) {
      this.firstNumber = this.result;
      this.secondNumber = undefined;
    } else {
      this.clear();
    }

    this.inputBuffer = "";
    return this.result;
  }

  clear() {
    this.firstNumber = undefined;
    this.secondNumber = undefined;
    this.operator = undefined;
    this.result = undefined;
    this.inputBuffer = "";
  }
}
