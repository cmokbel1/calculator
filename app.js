const number = document.querySelectorAll('.number')
const operator = document.querySelectorAll('.operator')
const clear = document.getElementById('AC')
const equals = document.getElementById('equals')
const decimal = document.getElementById('decimal')

number.forEach(num => num.addEventListener('click', e => {
  e.preventDefault();
  key = e.target.innerHTML;
  console.log(key);
}))

operator.forEach(op => op.addEventListener('click', e => {
  e.preventDefault();
  key = e.target;
  action = key.dataset.action;
  console.log(key.innerHTML, action);
}))

clear.addEventListener('click', e => {
  e.preventDefault();
  key = e.target;
  action = key.dataset.action;
  console.log(key.innerHTML, action);
})

equals.addEventListener('click', e => {
  e.preventDefault()
  key = e.target;
  action = key.dataset.action;
  console.log(key.innerHTML, action)
})