const display = document.getElementById("display");
const container = document.getElementById("container");

let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.innerText = displayValue;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (waitingForSecondOperand) return;
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);
  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);
    displayValue = String(result);
    firstOperand = result;
  }
  waitingForSecondOperand = true;
  operator = nextOperator;
}

const performCalculation = {
  "/": (first, second) => first / second,
  "*": (first, second) => first * second,
  "+": (first, second) => first + second,
  "-": (first, second) => first - second,
  "=": (first, second) => second,
};

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
}

function resetCalculator() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

container.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) return;
  const nilai = target.dataset.nilai;
  const aksi = target.dataset.aksi;

  if (aksi === "clear") {
    resetCalculator();
  } else if (aksi === "backspace") {
    backspace();
  } else if (aksi === "hitung") {
    handleOperator("=");
  } else if (target.classList.contains("operator")) {
    handleOperator(nilai);
  } else if (nilai === ".") {
    inputDecimal(nilai);
  } else {
    inputDigit(nilai);
  }
  updateDisplay();
});

document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (/[0-9]/.test(key)) inputDigit(key);
  if (key === ".") inputDecimal(key);
  if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
  if (key === "Enter" || key === "=") handleOperator("=");
  if (key === "Backspace") backspace();
  if (key === "Escape") resetCalculator();
  updateDisplay();
});
