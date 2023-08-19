const operate = {
  "+": (a, b) => +a + +b,
  "−": (a, b) => +a - +b,
  "÷": (a, b) => {
    if (b == 0) return "lol what";
    if (a == 0) return 0;
    return +a / +b;
  },
  "×": (a, b) => +a * +b,
  '^': (a, b) => (+a) ** +b,
};

const CALC_BTN = document.querySelectorAll("button");
const OPERAND_BTN = document.querySelectorAll(".operand");
const OPERATOR_BTN = document.querySelectorAll(".operator");
const DECIMAL_POINT = document.querySelector(".decimal");
const DELETE_BTN = document.querySelector(".btn-delete");
const CLEAR_BTN = document.querySelector(".btn-clear");

let operand = {
  first: "",
  last: "",
};
let operator = "";
let result;

DECIMAL_POINT.onclick = getDecimal;
DELETE_BTN.onclick = deleteSomeShit;
CLEAR_BTN.onclick = clearAllOfIt;
window.addEventListener("keydown", keyHandler);
for (let operandBtn of OPERAND_BTN) {
  operandBtn.addEventListener("click", () => {
    getOperand(operandBtn);
  });
}
for (let operatorBtn of OPERATOR_BTN) {
  operatorBtn.addEventListener("click", () => {
    getOperator(operatorBtn);
  });
}

function keyHandler(e) {
  let btn = document.querySelector(`button[data-key='${e.key}']`);
  if (!btn) return;
  if (btn.className === "operand") {
    getOperand(btn);
    return;
  }
  if (btn.className === "operator") {
    getOperator(btn);
    return;
  }
  if (e.key === "Backspace") {
    deleteSomeShit();
  }
  if (e.key === "Escape") {
    clearAllOfIt();
  }
  if (e.key === ".") {
    getDecimal();
  }
}

function getOperand(number) {
  if (operator === "" && operand.first.length < 12) {
    operand.first = operand.first + number.innerText;
    displayNumber(operand.first);
  } else if (operator !== "" && operand.last.length < 12) {
    operand.last = operand.last + number.innerText;
    displayNumber(operand.last);
  }
}

function getOperator(op) {
  if (operator === "" && op.innerText !== "=") {
    operator = op.innerText;
    displayNumber(operator);
  } else if (op.innerText !== "=") {
    result = operate[operator](operand.first, operand.last);
    operand.first = String(result);
    operand.last = "";
    operator = op.innerText;
    displayNumber(operator);
  } else if (op.innerText === "=" && operator !== "" && operand.last !== "") {
    result = operate[operator](operand.first, operand.last);
    operand.first = String(result);
    operand.last = "";
    operator = "";
    displayNumber(getSciNotation(`${result}`));
  }
}

function getDecimal() {
  if (
    operator === "" &&
    operand.first.length < 12 &&
    !operand.first.includes(".")
  ) {
    operand.first = operand.first + DECIMAL_POINT.innerText;
    displayNumber(operand.first);
  } else if (
    operator !== "" &&
    operand.last.length < 12 &&
    !operand.last.includes(".")
  ) {
    operand.last = operand.last + DECIMAL_POINT.innerText;
    displayNumber(operand.last);
  }
}

function deleteSomeShit() {
  if (operator === "") {
    operand.first = operand.first.substring(0, operand.first.length - 1);
    displayNumber(operand.first);
  } else {
    operand.last = operand.last.substring(0, operand.last.length - 1);
    displayNumber(operand.last);
  }
}

function clearAllOfIt() {
  operand.first = "";
  operand.last = "";
  operator = "";
  result = "";
  displayNumber(operand.first);
}

function displayNumber(text) {
  const INPUT_SCREEN = document.querySelector(".input");
  const OUTPUT_SCREEN = document.querySelector(".output");
  OUTPUT_SCREEN.innerText = `${operand.first} ${operator} ${operand.last}`;
  INPUT_SCREEN.innerText = text;
}

function getSciNotation(result) {
  const resultSciNotation = `${result / 10 ** (result.length - 1)}e${
    result.length - 1
  }`;
  const resultDecimalRounded = `${parseFloat(result).toFixed()}`;
  const resultIntegerRounded = `${
    (result / 10 ** (result.length - 1)).toFixed(1) * 10 ** (result.length - 1)
  }`;
  if (result.length <= 12) return result;
  if (result.includes("+")) return "too big lmao";
  if (result.length > 12 && result.includes(".")) return resultDecimalRounded;
  if (resultSciNotation.length > 12)
    return getSciNotation(resultIntegerRounded);
  return resultSciNotation;
}
