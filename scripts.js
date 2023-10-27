class Calculator {
  constructor(
    previousOperandTextElement,
    currentOperandTextElement,
    currentMathOperation,
    currentCalculatorAction
  ) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.currentMathOperation = currentMathOperation;
    this.currentCalculatorAction = currentCalculatorAction;
    this.clear();
  }
  clear() {
    this.currentOperand = "";
    this.PreviousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  addDigit(digit) {
    if (digit === "," && this.currentOperand.includes(",")) return;
    this.currentOperand = this.currentOperand.toString() + digit.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.PreviousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.PreviousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.PreviousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.PreviousOperand = "";
  }
  getDisplayNumber(digit) {
    const toStringnumber = digit.toString();
    const integerDigits = parseFloat(toStringnumber.split(".")[0]);
    const decimalDigits = toStringnumber.split(",")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("pt-br", {
        style: "decimal",
        minimumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.PreviousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  processCEOperator() {
    this.currentOperand = "0";
  }
  processCOperator() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = null;
  }
}

const buttons = document.querySelectorAll(".button");
const previousOperandTextElement = document.querySelector("#miniDisplay");
const currentOperandTextElement = document.querySelector("#display");

const calc = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (
      currentOperandTextElement.innerText.length >= 18 &&
      (value >= 0 || value === ",")
    ) {
      return;
    } else if (value >= 0 || value === ",") {
      calc.addDigit(btn.innerText);
      calc.updateDisplay();
      if (currentOperandTextElement.innerText.length >= 12) {
        currentOperandTextElement.style.fontSize = "40px";
      } else {
        currentOperandTextElement.style.fontSize = "50px";
      }
    } else if (
      value === "-" ||
      value === "+" ||
      value === "X" ||
      value === "÷"
    ) {
      calc.chooseOperation(btn.innerText);
      calc.updateDisplay();
      console.log("Op: " + value);
    } else if (value === "=") {
      calc.compute();
      calc.updateDisplay();
    } else if (value === "DEL") {
      calc.delete();
      calc.updateDisplay();

      console.log("Op: " + value);
    } else if (value === "CE") {
      calc.processCEOperator();
      calc.updateDisplay();
    } else if (value === "C") {
      calc.processCOperator();
      calc.updateDisplay();
    }
  });
});

//if (value === "-" || value === "+" || value === "x" || value === "÷")
