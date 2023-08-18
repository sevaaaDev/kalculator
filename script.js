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
let hasil;

for (let item of CALC_BTN) {
  item.addEventListener("click", (e) => {
    if (e.target.className === "operand" && operator === "" && operand.first.length < 8) {
      operand.first = operand.first + e.target.innerText;
      displayNumber(operand.first);
    } else if (e.target.className === "operand" && operator !== "" && operand.last.length < 8) {
      operand.last = operand.last + e.target.innerText;
      displayNumber(operand.last);
    } else if (
      e.target.className === "operator" &&
      e.target.innerText !== "="
    ) {
      operator = e.target.innerText;
      displayNumber(operator);
    } else if (e.target.innerText === "=" && operator !== "") {
      hasil = operate[operator](operand.first, operand.last);
      operand.first = String(hasil);
      operand.last = "";
      operator = "";
      displayNumber(hasil);
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
  hasil = "";
  displayNumber(operand.first)
};

function displayNumber(text) {
  const SCREEN = document.querySelector(".screen");
  SCREEN.innerText = text;
}
