const buttons = document.querySelectorAll('button')
const currentDisplay = document.querySelector('.calculator-display-current-operator p')
const lastDisplay = document.querySelector('.calculator-display-last-operator p')
let previousResult = NaN;
let N=0
if (window.innerWidth<500) {
    N=18;
}
else {
    N=24;
}
function Add(a,b){
    return a + b
}

function Subtract(a,b){
    return a - b
}

function Multiplication(a,b){
    return a*b
}

function Division(a,b){
    if(b===0){
        return 'Error'
    }
    return a/b
}

function operation(prevOperandAndOperator,currOperand){
    
    let operator = prevOperandAndOperator.slice(-1)
    firstOperand=prevOperandAndOperator.slice(0,-1)*1
    secondOperand=currOperand*1
    
    if (prevOperandAndOperator.length>N/2) {
        prevOperandAndOperator = prevOperandAndOperator.slice(0,1) + '........' + prevOperandAndOperator.slice(-3,-2) + prevOperandAndOperator.slice(-1) ;
    }
    if (currOperand.length>N/2){
        currOperand = currOperand.slice(0,1) + '........' + currOperand.slice(-1);
    }
    lastDisplay.textContent = prevOperandAndOperator + currOperand + '='

    switch(operator){
        case '+' :
            currentDisplay.textContent = `${Add(firstOperand,secondOperand)}`;
            break;
        case '-' :
            currentDisplay.textContent = `${Subtract(firstOperand,secondOperand)}`;
            break;
        case 'x' :
            currentDisplay.textContent = `${Multiplication(firstOperand,secondOperand)}`;
            break;
        case '÷' :
            currentDisplay.textContent = `${Division(firstOperand,secondOperand)}`;
            break;
    }
}

function operatorCheck(lastPressedButton){

    if (lastPressedButton==='.'){
        if (currentDisplay.textContent.includes('.')){
            return
        }
        currentDisplay.textContent+=lastPressedButton
    }

    else if (lastPressedButton==='='){
        if (lastDisplay.textContent==='' || currentDisplay.textContent==='0'|| lastDisplay.textContent.slice(-1) === '='){
            return
        }
        operation(lastDisplay.textContent,currentDisplay.textContent);
        previousResult=currentDisplay.textContent
    }
    else if (lastDisplay.textContent!='' && currentDisplay.textContent==='0' && lastPressedButton!='='){
        lastDisplay.textContent = lastDisplay.textContent.slice(0,-1) + lastPressedButton;
    }
    
    else if (currentDisplay.textContent!='0' && lastDisplay.textContent!='' && typeof(lastDisplay.textContent.slice(-1))==='string'){
        operation(lastDisplay.textContent,currentDisplay.textContent);
        lastDisplay.textContent=currentDisplay.textContent + lastPressedButton
        currentDisplay.textContent='0'
    }

    else{
        lastDisplay.textContent=currentDisplay.textContent + lastPressedButton;
        currentDisplay.textContent='0';
    }
}

function specialButtons(lastPressedButton){
    if (lastPressedButton==='CLEAR'){
        lastDisplay.textContent=''
        currentDisplay.textContent='0'
    }
    else {
        if (currentDisplay.textContent.length===1){
            currentDisplay.textContent='0'
        }

        else {
            currentDisplay.textContent=currentDisplay.textContent.slice(0,-1);
        }
    }
}

const buttonPressed = (e) => {
    if (currentDisplay.textContent==='Error'){
        currentDisplay.textContent='0'
        lastDisplay.textContent=''
    }

    if (e.target.className==='number'){
        if (currentDisplay.textContent.length<N){
            if (currentDisplay.textContent.length===1 &&currentDisplay.textContent==='0'){
                currentDisplay.textContent=e.target.textContent;
            }
            else{currentDisplay.textContent+=e.target.textContent;}

        }
    }
    else if (e.target.className==='operator'){
        operatorCheck(e.target.textContent);

    }
    else {
        specialButtons(e.target.textContent);
        }
}

for (let button of buttons) {
    button.addEventListener("click", buttonPressed);   
}
