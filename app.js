const keys = document.querySelectorAll('.calc-keys')
const display = document.getElementById('screen')
const calculator = document.getElementById('calculator')


const calculate = (n1, operator, n2) => {
 let result = ''
 if (operator === 'add') {
   result = parseFloat(n1) + parseFloat(n2)
 }
 if (operator === 'subtract') {
   result = parseFloat(n1) - parseFloat(n2)
 }
 if (operator === 'multiply') {
   result = parseFloat(n1) * parseFloat(n2)
 }
 if (operator === 'divide') {
   result = parseFloat(n1) / parseFloat(n2)
 }
 return result
}

keys.forEach(button => button.addEventListener('click', e => {
  e.preventDefault();
  const displayedNum = display.textContent
  const key = e.target
  const keyContent = key.textContent
  const action = key.dataset.action

 
  if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;
    display.textContent = calculate(firstValue, operator, secondValue)
  }

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    key.classList.add('is-depressed')
    calculator.dataset.previousKeyType = 'operator'
    calculator.dataset.firstValue = displayedNum
    calculator.dataset.operator = action
  }

  if (!action) {
    if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
      display.textContent = keyContent;
    } else {
      display.textContent = displayedNum + keyContent;
    }
  }


  if (action === 'decimal') {
    if (!displayedNum.includes('.')) {
    display.textContent = displayedNum + '.'
    }
  }



}))


// equals.addEventListener('click', e => {
//   e.preventDefault()
//   key = e.target;
//   action = key.dataset.action;
//   console.log(key.innerHTML, action)
// })

