const operate = {
  "+": (a, b) => +a + +b,
  "−": (a, b) => +a - +b,
  "÷": (a, b) => +a / +b,
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
    if (e.target.className === "operand" && operator === "") {
      operand.first = operand.first + e.target.innerText;
      console.log(operand.first);
    } else if (e.target.className === "operand") {
      operand.last = operand.last + e.target.innerText;
      console.log(operand.last);
    } else if (
      e.target.className === "operator" &&
      e.target.innerText !== "="
    ) {
      operator = e.target.innerText;
      console.log(operator);
    } else if (e.target.innerText === "=") {
      hasil = operate[operator](operand.first, operand.last);
      operand.first = String(hasil);
      operand.last = "";
      operator = "";
      console.log(hasil);
    }
  });
}

DELETE_BTN.onclick = () => {
  if (operator === "") {
    operand.first = operand.first.substring(0, operand.first.length - 1);
    console.log(operand.first);
  } else {
    operand.last = operand.last.substring(0, operand.last.length - 1);
    console.log(operand.last);
  }
};
