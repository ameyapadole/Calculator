let buffer = '0';
let runningTotal = 0; 
let previousOperator = null; 

const screen = document.querySelector('.screen');
//Keep the buffer as a string. 


function buttonClick(value)
{
   if(isNaN(parseInt(value)))
   {
        handleSymbols(value);
   }

   else
   {
    handleNumbers(value);
   }
   rerender();
}

function handleNumbers(number){
    
    if(buffer === '0'){
        buffer = number; 
    }
    else{
        buffer += number; 
    }

}
function flushOperation(intBuffer)
{
    if (previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator === '-' )
    {
        runningTotal -= intBuffer;
    }

    else if(previousOperator === 'x')
    {
        runningTotal *= intBuffer;
    }

    else if(previousOperator ==='÷'){
        runningTotal /= intBuffer;
    }
}
function handleSymbols(symbol){

    switch(symbol)
        {
            case 'C':
                buffer ='0';
                runningTotal = 0;
                break;
            
            case '=':
                if(previousOperator === null)
                {
                    //need two numbers to do math
                    return;
                }

                flushOperation(parseInt(buffer));

                previousOperator = null; 
                buffer = "" +runningTotal;
                runningTotal = 0; 
                break;
            
            case '←':
                if(buffer.length === 1)
                {
                    buffer = '0';
                }
                else{

                    buffer = buffer.substring(0, buffer.length-1);
                }
                break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                handleMath(symbol);
                break;
        }
}

function handleMath(value){
    if(buffer === '0'){
         //do nothing and return
         return;
    }

    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator = value; 
    buffer = '0'; 

}
function rerender(){
    screen.innerText = buffer; 
}
function init() {
    document
      .querySelector(".calculator-buttons")
      .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
      });
  }

init();
