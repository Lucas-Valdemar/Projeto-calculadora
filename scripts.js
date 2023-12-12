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
    const saveOperation = undefined;
    this.isComma = false;
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
    if (digit === ",") {
      this.isComma = true;
    } else {
      this.isComma = false;
    }
    if (digit === "," && this.currentOperand.includes(",")) return;
    this.currentOperand = this.currentOperand.toString() + digit.toString();
  }

  chooseOperation(operation) {
    if (this.operation === "=") {
      this.operation = this.saveOperation;
      this.compute();
      this.operation = operation;
    }
    if (this.operation !== undefined && this.currentOperand === "") {
      this.operation = operation;
    }
    if (this.PreviousOperand !== "") {
      this.compute();
      this.operation = operation;
    } else {
      this.operation = operation;
      this.PreviousOperand = this.currentOperand;
      this.currentOperand = "";
      this.saveOperation = operation;
    }
  }

  compute() {
    let computation;
    const prev = Number(this.PreviousOperand.toString().replace(",", "."));
    const current = Number(this.currentOperand.toString().replace(",", "."));
    if (this.operation !== undefined && this.currentOperand === "") {
      return;
    }
    console.log(prev, current);
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

    this.currentOperand = "";
    this.PreviousOperand = computation;
  }

  getDisplayNumber(digit) {
    const toStringNumber = digit.toString();
    const integerDigits = Number(toStringNumber.split(".")[0]);
    const decimalDigits = toStringNumber.split(".")[1];
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
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    if (isNaN(this.currentOperand)) {
      this.currentOperandTextElement.innerText = Number(
        this.currentOperand.replace(",", ".")
      ).toLocaleString("pt-br", {
        style: "decimal",
        minimumFractionDigits: 0,
      });
      if (
        this.isComma == true &&
        !this.currentOperandTextElement.innerText.includes(",")
      ) {
        const convertedValue = Number(
          this.currentOperand.replace(",", ".")
        ).toLocaleString("pt-br", {
          style: "decimal",
          minimumFractionDigits: 0,
        });

        this.currentOperandTextElement.innerText = `${convertedValue}${","}`;
      }
    } else {
      this.currentOperandTextElement.innerText = Number(
        this.currentOperand
      ).toLocaleString("pt-br", {
        style: "decimal",
        minimumFractionDigits: 0,
      });
    }

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.PreviousOperand} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  processCEOperator() {
    this.currentOperand = "0";
  }

  processCOperator() {
    this.currentOperand = "0";
    this.PreviousOperand = "";
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
      calc.chooseOperation(value);
      calc.updateDisplay();
      console.log("Op: " + value);
    } else if (value === "=") {
      calc.chooseOperation(value);
      calc.updateDisplay();
      console.log("Op: " + value);
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
