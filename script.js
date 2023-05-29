const numberButtons = [...document.querySelectorAll('[data-number]')];
const operatorButtons = [...document.querySelectorAll('[data-operator]')];
const resultDisplay = document.querySelector('#result-display');
const firstDisplay = document.querySelector('#first-display');
const clearAllButton = document.querySelector('#all-clear');
const equalButton = document.querySelector('#equal');
const deleteButton = document.querySelector('#clear');
const percentButton = document.querySelector('#percent');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

document.addEventListener('keydown', handleKeyboardInput);
numberButtons.forEach(button => button.addEventListener('click', () => appendNumber(button.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', () => setOperator(button.textContent)));
clearAllButton.addEventListener('click', clear);
equalButton.addEventListener('click', compute);
deleteButton.addEventListener('click', deleteText);
percentButton.addEventListener('click', percent);

function percent() {
    resultDisplay.innerText = resultDisplay.innerText / 100;
}

function clear() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    firstDisplay.innerText = '';
    resultDisplay.innerText = '';
}

function deleteText() {
    resultDisplay.innerText = resultDisplay.innerText.toString().slice(0, -1);
}

function clearResultDisplay() {
    resultDisplay.innerText = '';
}

function appendNumber(number) {
    if(number === '.' && resultDisplay.innerText.includes('.')) {
        return;
    }
    if (number === '0' && resultDisplay.innerText === '0') {
        return;
    }
    resultDisplay.innerText += number;
}

function setOperator(operator) {
    if (currentOperator !== null) compute();
    firstOperand = resultDisplay.innerText;
    currentOperator = operator;
    firstDisplay.innerText = `${firstOperand} ${currentOperator}`;
    clearResultDisplay();
}

function compute() {
    let result;
    if (currentOperator === null || firstOperand === '') return;
    secondOperand = resultDisplay.textContent;
    firstDisplay.innerText = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    result = Math.round(operate(currentOperator, firstOperand, secondOperand) * 100) / 100;
    resultDisplay.innerText = result;
    currentOperator = null;
}

function operate(currentOperator, firstOperand, secondOperand) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    switch (currentOperator) {
        case '+':
            return add(firstOperand, secondOperand);
        case '-':
            return subtract(firstOperand, secondOperand);
        case 'x':
            return multiply(firstOperand, secondOperand);
        case '÷':
            if (secondOperand === 0) return 'Error';
            else return divide(firstOperand, secondOperand);
        default:
            return null;
    }
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}
 
function divide(a, b) {
    return a / b;
}

function handleKeyboardInput(event) {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendNumber(event.key);
    if (event.key === '=' || event.key === 'Enter') compute();
    if (event.key === 'Backspace') deleteText();
    if (event.key === 'Escape') clear();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        setOperator(changeOperator(event.key));
    }
}

function changeOperator(key) {
    if (key === '/') return '÷';
    if (key === '*') return 'x';
    return key;
}



