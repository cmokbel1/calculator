const keys = document.querySelectorAll('.calc-keys');
const display = document.getElementById('screen');
const calculator = document.getElementById('calculator');


keys.forEach(button => button.addEventListener('click', e => {
  // prevent screen refresh
  e.preventDefault();
  // setting the displayed number equal to the display screens text content
  const displayedNum = display.textContent;
  // defining which button has been pressed
  const key = e.target;
  // defining the content within that key
  const keyContent = key.textContent;
  // defining the action of the button if there is one
  const action = key.dataset.action;

  // if the button clicked has an action of calculate and an operator has already been pressed
  if (action === 'calculate' && calculator.dataset.operator) {
    //set the key type
    calculator.dataset.previousKeyType = 'calculate'
    //set calculation values
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;
    // loop through the key system to determine which operator has the is-depressed class
    keys.forEach(key => key.classList.remove('is-depressed'))
    // set the display screen equal to the calculation of our values with operator
    display.textContent = calculate(firstValue, operator, secondValue);
    // saving the calculation to an object variable
    const savedCalculation = {
      "firstValue": firstValue,
      "operator": operator,
      "secondValue": secondValue
    }
    //saving that object to the local Storage for later use
    localStorage.setItem('prevCalc', savedCalculation)
  }

  // if any of the buttoons pressed have an action defined as following
  if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
    // we iterate over the keys to remove any previously pressed operator
    keys.forEach(key => key.classList.remove('is-depressed'))
    // set the new operator as having been pressed
    key.classList.add('is-depressed');
    // set our previous keytype to operator
    calculator.dataset.previousKeyType = 'operator';
    // then we set the firstValue attribute because we are ready to move onto generating a second value
    calculator.dataset.firstValue = displayedNum;
    // and finally we set the operator attribute for the calculator as the action of the key pressed
    calculator.dataset.operator = action;

  }
  // if the button pressed has an action of clear
  if (action === 'clear') {
    // we set the previous key type to clear
    calculator.dataset.previousKeyType = 'clear';
    // we clear the first value attribute
    calculator.dataset.firstValue = '';
    // we also clear the operator 
    calculator.dataset.operator = '';
    // then we reset the display screen to 0
    display.textContent = '0';
    // lastly we remove the class of is-depressed from any of the operators that may have this class attached
    keys.forEach(key => key.classList.remove('is-depressed'))
  }

  // if the button we are pressing does not have the action attribute(it's a number)
  if (!action) {
    //if the screen displays 0, or the previous key type of the calculator is set to operator, or the previous key type is set to calculate
    if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
      // we change the display screen value to the value of the button pressed
      display.textContent = keyContent;
      // if the displayed number's length is less than 16
    } else if (displayedNum.length < 16) {
      // we append the current number pressed to the previous number
      display.textContent = displayedNum + keyContent;
    }
    // lastly we set the previous key type to number
    calculator.dataset.previousKeyType = 'number'
  }

  // if the button pressed has an action of decimal 
  if (action === 'decimal') {
    // and if the currently displayed number does not already include a decimal
    if (!displayedNum.includes('.')) {
      // we will append the displayed number with a decimal
      display.textContent = displayedNum + '.'
      // if the previous key type however is set to operator
    } else if (calculator.dataset.previousKeyType === 'operator') {
      // we changed the displayed content to be a 0 and a decimal
      display.textContent = '0.'
    }
    // lastly we set the previous key type to decimal
    calculator.dataset.previousKeyType === 'decimal';
  }


}))

// here we have a caluclation function
const calculate = (n1, operator, n2) => {
  // we set the result to an empty string
  let result = ''
  // we define caluclations by the operator clicked
  if (operator === 'add') {
    // then we parseFloat the numbers of the first and second value because we need to change them from strings to numbers
    result = parseFloat(n1) + parseFloat(n2);
  }
  if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  }
  if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  }
  if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }
  // lastly we return the result
  return result
}