let button = document.querySelectorAll('button')

let operand =  {
  first: '',
  last: '',
}
let operator
let hasil

for (let item of button) {
  item.addEventListener('click', (e) => {
    if (e.target.className === 'operand' && operator === undefined) {
      operand.first = operand.first + e.target.innerText;
      console.log(operand.first)
    } else if (e.target.className === 'operand') {
      operand.last = operand.last + e.target.innerText;
      console.log(operand.last)
    } else if (e.target.className === 'operator' && e.target.innerText !== '='){
      operator = e.target.innerText
      console.log(operator)
    } else if (e.target.innerText === '=') {
      hasil = operate[operator](operand.first, operand.last)
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

