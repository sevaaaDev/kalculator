let button = document.querySelectorAll('button')

let operand1 = ''
let operand2 = ''
let operator
let hasil

for (let item of button) {
  item.addEventListener('click', (e) => {
    if (e.target.className === 'operand' && operator === undefined) {
      operand1 += e.target.innerText;
      console.log(operand1)
    } else if (e.target.className === 'operand') {
      operand2 = e.target.innerText;
      console.log(operand2)
    } else if (e.target.className === 'operator' && e.target.innerText !== '='){
      operator = e.target.innerText
      console.log(operator)
    } else if (e.target.innerText === '=') {
      hasil = operate[operator](operand1, operand2)
      console.log(hasil)
    }
  })
}

const operate = {
  '+': (a, b) => +a + +b,
  '−': (a, b) => +a - +b,
  '÷': (a, b) => +a / +b,
  '×': (a, b) => +a * +b,
}

