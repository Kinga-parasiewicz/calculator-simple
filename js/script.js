class Calculator{
    constructor(previousButton, currentButton){
        this.previousButton = previousButton
        this.currentButton = currentButton
        this.clear();
    }
     
    clear(){
        this.currentOperand = " "
        this.previousOperand = " "
        this.operation = " "
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))
        return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === ' ')
        return
        if(this.previousOperand !== ' '){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if(isNaN(prev) || isNaN(current))return
      switch (this.operation){
        case '+':
              computation = prev + current
              break;
        case '-':
              computation = prev - current
              break;
        case '*':
              computation = prev * current
              break;
        case '/':
              computation = prev / current
              break;
        default:
            return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ' '
    }

    updateDisplay(){
        this.currentButton.innerText = this.currentOperand
        if(this.operation != null){
        this.previousButton.innerText = `${this.previousOperand} ${this.operation}`}}
};

const numberButtons = document.querySelectorAll(".js-number")
const operationButtons = document.querySelectorAll(".js-operation")
const equalsButton = document.querySelector(".js-equals")
const deleteButton = document.querySelector(".js-delete")
const allClearButton = document.querySelector(".js-allClear")
const previousButton = document.querySelector(".js-previous-operand")
const currentButton = document.querySelector(".js-current-operand")

const calculator = new Calculator(previousButton, currentButton)

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})