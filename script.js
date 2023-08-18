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

const CALC_BTN = document.querySelectorAll('button')
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

for (let operandBtn of OPERAND_BTN) {
  operandBtn.addEventListener("click", () => {
    if (operator === "" && operand.first.length < 8) {
      operand.first = operand.first + operandBtn.innerText;
      displayNumber(operand.first);
    } else if (operator !== "" && operand.last.length < 8) {
      operand.last = operand.last + operandBtn.innerText;
      displayNumber(operand.last);
    }
  });
}

for (let operatorBtn of OPERATOR_BTN) {
  operatorBtn.addEventListener("click", () => {
    if (operator === '' && operatorBtn.innerText !== "=") {
      operator = operatorBtn.innerText;
    } else if (operatorBtn.innerText !== "=") {
      result = operate[operator](operand.first, operand.last);
      operand.first = String(result);
      operand.last = "";
      operator = operatorBtn.innerText;
      displayNumber(getSciNotation(`${result}`));
    } else if (operatorBtn.innerText === "=" && operator !== "") {
      result = operate[operator](operand.first, operand.last);
      operand.first = String(result);
      operand.last = "";
      operator = "";
      displayNumber(getSciNotation(`${result}`));
    }
  });
}

for (let btn of CALC_BTN) {
  btn.addEventListener('click', () => {
    for (let button of OPERATOR_BTN) {
      button.style.background = 'purple'
    }
    for (let button of OPERAND_BTN) {
      button.style.background = 'aliceblue'
    }
  })
}

for (let operandBtn of OPERAND_BTN) {
  operandBtn.addEventListener('click', () => {
    operandBtn.style.background = 'lightblue'
  })
} 

for (let operatorBtn of OPERATOR_BTN) {
  operatorBtn.addEventListener('click', () => {
    operatorBtn.style.background = 'green'
  })
}

DECIMAL_POINT.onclick = () => {
  if (
    operator === "" &&
    operand.first.length < 8 &&
    !operand.first.includes(".")
  ) {
    operand.first = operand.first + DECIMAL_POINT.innerText;
    displayNumber(operand.first);
  } else if (
    operator !== "" &&
    operand.last.length < 8 &&
    !operand.last.includes(".")
  ) {
    operand.last = operand.last + DECIMAL_POINT.innerText;
    displayNumber(operand.last);
  }
};

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
  const resultSciNotation = `${result / 10 ** (result.length - 1)}e${
    result.length - 1
  }`;
  const resultDecimalRounded = `${parseFloat(result).toFixed()}`;
  const resultIntegerRounded = `${
    (result / 10 ** (result.length - 1)).toFixed(1) * 10 ** (result.length - 1)
  }`;
  if (result.length <= 8) return result;
  if (result.includes("+")) return "too much";
  if (result.length > 8 && result.includes(".")) return resultDecimalRounded;
  if (resultSciNotation.length > 8) return getSciNotation(resultIntegerRounded);
  return resultSciNotation;
}
