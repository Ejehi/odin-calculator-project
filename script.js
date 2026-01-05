
const currentDisplay = document.querySelector("#current");
const previousDisplay = document.querySelector("#history");

let result = '', firstOperand = '', secondOperand = '', currentOperator = null;

let operatorList = ["+", "-", "/", "*"];
let operandList = ["1", "2", "3", "4"
    ,"5", "6", "7", "8", "9", "0"
];

const addNumbers = (num1, num2) => String(Number(num1) + Number(num2));
const subtractNumbers = (num1, num2) => String(Number(num1) - Number(num2));
const multiplyNumbers = (num1, num2) => String(Number(num1) * Number(num2));
const divideNumbers = (num1, num2) => String(Number(num1) / Number(num2));

const operate = (currentOperator, firstOperand, secondOperand) => {
    switch (currentOperator) {
        case "+": return addNumbers(firstOperand, secondOperand);
        case "-": return subtractNumbers(firstOperand, secondOperand);
        case "*": return multiplyNumbers(firstOperand, secondOperand);
        case "/": 
            if (secondOperand == 0) return null;
            return divideNumbers(firstOperand, secondOperand);
    }
};

const clearAll = () => {
    if (currentDisplay.textContent == '0') currentDisplay.textContent = '0';
    else {
        currentDisplay.textContent = "0";
        previousDisplay.textContent = "";
        result = '', firstOperand = '', secondOperand = '', currentOperator = null;
    }
};

const calculate = () => {
    if (currentOperator !== null) {
        if (currentOperator === '/' && secondOperand === '0') {
            previousDisplay.textContent = "Cannot compute!";
            return;
        }
        result = operate(currentOperator, firstOperand, secondOperand);
        previousDisplay.textContent = `${result}`;
        currentDisplay.textContent = `${result}`;
        firstOperand = result, secondOperand = '', currentOperator = null;
    }
};

const deleteItem = () => {
    if (currentDisplay.textContent == '0' || currentDisplay.textContent.slice(0, -1) == '') 
        {
            previousDisplay.textContent = '';
            currentDisplay.textContent = '0';
            result = '', firstOperand = '', secondOperand = '', currentOperator = null;
        }
    else {
        if (currentOperator == null) {
            firstOperand = currentDisplay.textContent.slice(0, -1) == '' ? '' : currentDisplay.textContent.slice(0, -1);
            currentDisplay.textContent = currentDisplay.textContent.slice(0, -1) == '' ? '0' : currentDisplay.textContent.slice(0, -1);
        }
        else if (currentOperator != null && operatorList.includes(currentDisplay.textContent.slice(-1))) {
            currentOperator = null;
            currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        }
        else {
            secondOperand = currentDisplay.textContent.slice((currentDisplay.textContent.indexOf(currentOperator) + 1), -1);
            currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        }
    }
};

const appendOperand = (operand) => {
    if (currentOperator == null) {
        currentDisplay.textContent = currentDisplay.textContent == '0' ? operand : currentDisplay.textContent + operand;
        firstOperand += operand;
    }
    else {
        currentDisplay.textContent += operand;
        secondOperand += operand;
    }
};

const appendPoint = () => {
    if (currentOperator == null) {
        if (!firstOperand.includes('.') 
            && currentDisplay.textContent.slice(-1) != '.' 
            && !operatorList.includes(currentDisplay.textContent.slice(-1))
        ){
            firstOperand += '.';
            currentDisplay.textContent += '.';
        }     
    }
    else {
        if (currentDisplay.textContent.slice(-1) != '.' 
            && !operatorList.includes(currentDisplay.textContent.slice(-1))
            && !secondOperand.includes('.')
        ){
            currentDisplay.textContent += '.';
            secondOperand += '.';
        }
    }
};

const appendOperator = (sign) => {
    if(!operatorList.includes(currentDisplay.textContent.slice(-1)) && currentDisplay.textContent.slice(-1) != '.') {
        if (currentOperator == null) {
            currentOperator = sign;
            currentDisplay.textContent += sign;
        }
        else {
            if (currentOperator === '/' && secondOperand === '0') {
                previousDisplay.textContent = "Cannot compute!";
                return;
            }
            else {
                result = operate(currentOperator, firstOperand, secondOperand);
                currentOperator = sign;
                firstOperand = result;
                secondOperand = '';
                previousDisplay.textContent = `${result}`;
                currentDisplay.textContent = `${result}${sign}`;
            }
        } 
    }
};