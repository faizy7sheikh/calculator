class Calculator{
    constructor(prevoperandElement,currentoperandElement){
        this.prevoperandElement = prevoperandElement;
        this.currentoperandElement = currentoperandElement;
        this.clear();
    }

    // function clear
    clear(){
        this.currentoperand = '';
        this.prevoperand = '';
        this.operation = undefined;
    }

    // delete method
    delete(){
        this.currentoperand = this.currentoperand.toString().slice(0,-1)
    }
    
    appendNumber(number){
        if(number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString();

    }

    chooseOperation(operation){
        if(this.currentoperand === '') return
        if(this.prevoperand != ''){
            this.compute();
        }
        this.operation = operation;
        this.prevoperand = this.currentoperand;
        this.currentoperand = ''; 
    }

    // equals method
    compute(){
        let computational;
        let prev = parseFloat(this.prevoperand);
        let current = parseFloat( this.currentoperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computational = prev + current;
            break;
            case '-':
                computational = prev - current;
            break;
            case '*':
                computational = prev * current;
            break;
            case '/':
                computational = prev / current;
            break;
            default:
                return
        }
        this.currentoperand = computational;
        this.operation = undefined;
        this.prevoperand = '';

    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerdigits = parseFloat(stringNumber.split('.')[0]);
        const decimaldigit = stringNumber.split('.')[1];
        let integerDisplay 
        if(isNaN(integerdigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerdigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimaldigit != null){
            return `${integerDisplay}.${decimaldigit}`;
        }else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentoperandElement.innerText = this.getDisplayNumber(this.currentoperand);
        if(this.operation != null){
            this.prevoperandElement.innerText = 
            `${this.getDisplayNumber(this.prevoperand)} ${this.operation}`;
        }
        
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const clearAllButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevoperandElement = document.querySelector("[data-previous-operand]");
const currentoperandElement = document.querySelector("[data-current-operand]");

const calculat = new Calculator(prevoperandElement,currentoperandElement);


console.log(calculat);
numberButtons.forEach(function(btn){
    btn.addEventListener("click",() => {
       calculat.appendNumber(btn.innerText);
       calculat.updateDisplay();
    });
});

//delete button
operationButtons.forEach(function(btn){
    btn.addEventListener("click",() => {
       calculat.chooseOperation(btn.innerText);
       calculat.updateDisplay();
    });
});

equalButton.addEventListener("click", button =>{
    calculat.compute();
    calculat.updateDisplay();
});

clearAllButton.addEventListener("click", button =>{
    calculat.clear();
    calculat.updateDisplay();
});

deleteButton.addEventListener("click", button =>{
    calculat.delete();
    calculat.updateDisplay();
});

console.log(numberButtons);