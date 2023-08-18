const operate = {
  "+": (a, b) => +a + +b,
  "−": (a, b) => +a - +b,
  "÷": (a, b) => {
    if (b == 0) return "lol what";
    if (a == 0) return 0;
    return +a / +b;
  },
  "×": (a, b) => +a * +b,
};

const CALC_BTN = document.querySelectorAll("button");
const DELETE_BTN = document.querySelector(".btn-delete");
const CLEAR_BTN = document.querySelector(".btn-clear");

let operand = {
  first: "",
  last: "",
};
let operator = "";
let result;

for (let item of CALC_BTN) {
  item.addEventListener("click", (e) => {
    if (
      e.target.className === "operand" &&
      operator === "" &&
      operand.first.length < 8
    ) {
      operand.first = operand.first + e.target.innerText;
      displayNumber(operand.first);
    } else if (
      e.target.className === "operand" &&
      operator !== "" &&
      operand.last.length < 8
    ) {
      operand.last = operand.last + e.target.innerText;
      displayNumber(operand.last);
    } else if (
      e.target.innerText === '.' &&
      operator === "" &&
      operand.first.length < 8 &&
      !(operand.first.includes('.'))
    ) {
      operand.first = operand.first + e.target.innerText;
      displayNumber(operand.first);
    } else if (
      e.target.innerText === '.' &&
      operator !== "" &&
      operand.last.length < 8 &&
      !(operand.last.includes('.'))
    ) {
      operand.last = operand.last + e.target.innerText;
      displayNumber(operand.last);
    } else if (
      e.target.className === "operator" &&
      e.target.innerText !== "="
    ) {
      operator = e.target.innerText;
      displayNumber(operator);
    } else if (e.target.innerText === "=" && operator !== "") {
      result = operate[operator](operand.first, operand.last);
      operand.first = String(result);
      operand.last = "";
      operator = "";
      displayNumber(getSciNotation(`${result}`));
    }
  });
}

DELETE_BTN.onclick = () => {
  if (operator === "") {
    operand.first = operand.first.substring(0, operand.first.length - 1);
    displayNumber(operand.first);
  } else {
    operand.last = operand.last.substring(0, operand.last.length - 1);
    displayNumber(operand.last);
  }
};

CLEAR_BTN.onclick = () => {
  operand.first = "";
  operand.last = "";
  operator = "";
  result = "";
  displayNumber(operand.first);
};

function displayNumber(text) {
  const SCREEN = document.querySelector(".screen");
  SCREEN.innerText = text;
}

function getSciNotation(result) {
  const resultSciNotation = `${result / 10 ** (result.length - 1)}e${result.length - 1}`;
  const resultDecimalRounded = `${parseFloat(result).toFixed()}`;
  const resultIntegerRounded = 
  `${(result / 10 ** (result.length - 1)).toFixed(1) * 10 ** (result.length - 1)}`;
  if (result.length <= 8) return result;
  if (result.includes("+")) return "too much";
  if (result.length > 8 && result.includes(".")) return resultDecimalRounded;
  if (resultSciNotation.length > 8) return getSciNotation(resultIntegerRounded);
  return resultSciNotation;
}
