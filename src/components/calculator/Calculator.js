import React,{useState} from 'react'
import NumberButton from '../buttons/NumberButton';
import "./Calculator.css"
import NUMS from "../buttons/button-data/NumberData.json"
import BASICOPERATORS from "../buttons/button-data/BasicOperations.json"
import SPECIALOPERATORS from "../buttons/button-data/SpecialOperations.json"
import ADDITIONALOPERATORS from "../buttons/button-data/AdditionalOperations.json"
import Display from '../display/Display';

//Component that handles the main calculator functionality 
const Calculator = () => {
    const[numberInput, setInput] = useState("0")
    const[pressedOps, setPressedOps] = useState(false)
    const[storedNumber, setStoredNumber] = useState("0")
    const[operator, setOperator] = useState("");
    const[beforeParentheses, setBeforeValues] = useState({"storedVal":"", "storedOp": ""})
    const[pressedParentheses, setPressedParentheses] = useState(false)
  
    //Function to handle the input of numbers.
    const numberInputHandler = (number) => {
        
        setPressedOps(false);

        //Condition to handle error inputs.
        if(numberInput === "Error"){
            clearHandler("A/C")
            setInput(number.toString())
        }
        //Condition to handle input number after selection an operation.
        if ((storedNumber && pressedOps)) {
            setInput(number.toString());
            return;
        }
        //Condition to prevent multiple leading zeros for the input number.
        if (number === 0 && numberInput === "0" ) {
            setInput("0");
            return;
        }
        //Condition to prevent the input of multiple decimal points.
        if(number === "."){
            if (!numberInput.includes(".")) {
                setInput(numberInput.toString() + ".");
            }
            return
        }

       // Condition to create a number input. 
        if (numberInput === "0") {
            setInput(number.toString());
        } else {
            setInput(numberInput.toString() + number.toString());
        }
        
    };

    //Function to select basic operation to use in calculation.
    const operationHandler = (sign) =>{

        let result = numberInput? numberInput : storedNumber
        
        setPressedOps(true)

        //Condition for chaining operations without pressing the equal sign.
        if(storedNumber && operator && pressedOps === false){
            result= calculationHandler()
        }
        //Input number is stored after an operation is selected.
        setStoredNumber(Number(result))
        setOperator(sign)

    }

    //Function to execute the square root
    const squareRootHandler = () => {
        // Note: The square root function is a special operation that is conducted on the input number.
        // Unlike the basic operations function, the square root function does not store the input number.

        let number = numberInput ? numberInput : storedNumber;
        
        setPressedOps(true)

        let calcResults = Math.sqrt(Number(number));

        setInput(calcResults.toString());
    };

    //Function to handle converting a percentage to a decimal.
    const percentHandler = () => {
        // Note: The percent function is a special operation that is conducted on the input number.
        // Unlike the basic operations function, the percent function does not store the input number.

        let number = numberInput ? numberInput : storedNumber;
        
        setPressedOps(true)

        let calcResults = number/100;

        setInput(calcResults.toString());
    };

    //Function to delete input number or to reset calculator data.
    const clearHandler = (input) => {
        //Condition to reset calculator. 
        if (input === "A/C") {
          setOperator("");
          setStoredNumber("0");
          setBeforeValues({"storedVal":"", "storedOp": ""});
          setPressedParentheses(false);
        }
        //Reset the input number to zero.
        setInput("0");
    };

    //Function to handle the calculation of basic operations.
    const calculationHandler = () =>{

        let calcResults = numberInput ? numberInput : storedNumber

        if(operator === "+"){
            calcResults = storedNumber + Number(numberInput)
        }
        if(operator === "-"){
            calcResults = storedNumber - Number(numberInput)
        }
        if(operator === "x"){
            calcResults = storedNumber * Number(numberInput)
        }
        if(operator === "/"){
            calcResults = storedNumber / Number(numberInput)
        }
        if(operator === "EXP"){
            calcResults = storedNumber ** Number(numberInput)
        } 
    
        setOperator("")
        setInput("")
        setStoredNumber(calcResults.toString())
        
        return calcResults.toString()
    }

    //Function to convert input number to a negative or positive number.
    const negPosOp = () => {
      let num =numberInput ? numberInput : storedNumber
      setInput((Number(num) * -1).toString())
    } 
    
    //Function to handle the parentheses functionality.
    const parenthesesHandler = () => {
        if (pressedParentheses === false) {
            setPressedParentheses(true);
            setBeforeValues({"storedVal":storedNumber, "storedOp": operator});
            setStoredNumber("");
            setInput("0");
        } else { 
            setPressedParentheses(false);
            let parResults = calculationHandler();
            setInput(parResults);
            setStoredNumber(beforeParentheses.storedVal);
            setOperator(beforeParentheses.storedOp)
            setBeforeValues({"storedVal":"", "storedOp": ""});
        }
    };
 
    //Object to point to the calculator buttons corresponding function handler.
    const functionDictionary = {
        "+/-" : negPosOp, 
        "calculation": calculationHandler,
        "clear": clearHandler,
        "numberInput" : numberInputHandler,
        "operation": operationHandler,
        "parentheses": parenthesesHandler,
        "percent": percentHandler,
        "squareRoot": squareRootHandler
        
    }
    
  return (
    <div className = "calcContainer">

            <Display 
            numberInput = {numberInput} 
            storedNumber= {storedNumber}
            parenthesesOn = {pressedParentheses}
            />
        
        {/* Calculator buttons */}
        <div className= "buttonContainer">
            <div className = "numberContainer"> 
                
                {SPECIALOPERATORS.map(specialOp => (
        
                    <NumberButton 
                    key ={`button ${specialOp.id}`}
                    symbol = {specialOp.btnSymbol}
                    handler = {functionDictionary[specialOp.handler]}
                    parameter={specialOp.parameter}
                    classType = {specialOp.classType}
                    idType = {specialOp.idType}
                    />
                    
                ))}
            
                {ADDITIONALOPERATORS.map(additionalOp => (
                    
                    <NumberButton 
                    key ={`button ${additionalOp.id}`}
                    symbol = {additionalOp.btnSymbol}
                    handler = {functionDictionary[additionalOp.handler]}
                    parameter={additionalOp.parameter}
                    classType = {additionalOp.classType}
                    idType = {additionalOp.idType}
                    />
                ))}
            
                {NUMS.map(number => (
                    
                    <NumberButton 
                    key ={`button ${number.id}`}
                    symbol = {number.btnSymbol}
                    handler = {functionDictionary[number.handler]}
                    parameter={number.parameter}
                    classType = {number.classType}
                    idType = {number.idType}
                    />
                ))}
                       
            </div>
            <div className= "basicOpContainer">
                        
                {BASICOPERATORS.map(basicOp => (
                    
                    <NumberButton 
                    key ={`button ${basicOp.id}`}
                    symbol = {basicOp.btnSymbol}
                    handler = {functionDictionary[basicOp.handler]}
                    parameter={basicOp.parameter}
                    classType = {basicOp.classType}
                    idType = {basicOp.idType}
                    />
                    
                ))}
                    
             </div>
        </div>
    </div>
  )
}

export default Calculator