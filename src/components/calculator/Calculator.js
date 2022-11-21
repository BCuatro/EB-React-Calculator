import {useState} from 'react'
import NumberButton from '../buttons/NumberButton';
import "./Calculator.css"
import NUMS from "../buttons/button-data/NumberData.json"
import BASICOPERATORS from "../buttons/button-data/BasicOperations.json"
import SPECIALOPERATORS from "../buttons/button-data/SpecialOperations.json"
import ADDITIONALOPERATORS from "../buttons/button-data/AdditionalOperations.json"
import Display from '../display/Display';

const Calculator = () => {
    const[numberInput, setInput] = useState("0")
    const[pressedOps, setPressedOps] = useState(false)
    const[storedNumber, setStoredNumber] = useState("0")
    const[operator, setOperator] = useState("");
    const[beforeParentheses, setBeforeValues] = useState({"storedVal":"", "storedOp": ""})
    const[pressedParentheses, setPressedParentheses] = useState(false)
  
   
    const numberInputHandler = (number) => {
        
        setPressedOps(false);

        if(numberInput === "Error"){
            clearHandler("A/C")
            setInput(number.toString())
        }

        if ((storedNumber && pressedOps)) {
            setInput(number.toString());
            return;
        }
    
        if (number === 0 && numberInput === "0" ) {
            setInput("0");
            return;
        }

        if(number === "."){
            if (!numberInput.includes(".")) {
                setInput(numberInput.toString() + ".");
            }
            return
        }

       
        if (numberInput === "0") {
            setInput(number.toString());
        } else {
            setInput(numberInput.toString() + number.toString());
        }
        
    };


    const operationHandler = (sign) =>{

        let result = numberInput? numberInput : storedNumber
        
        setPressedOps(true)
        
        if(storedNumber && operator && pressedOps === false){
            result= calculationHandler()
        }

        setStoredNumber(Number(result))
        setOperator(sign)

    }


    const squareRootHandler = () => {
        let number = numberInput ? numberInput : storedNumber;
        
        setPressedOps(true)

        let calcResults = Math.sqrt(Number(number));

        setInput(calcResults.toString());
    };


    const percentHandler = () => {
        let number = numberInput ? numberInput : storedNumber;
        
        setPressedOps(true)

        let calcResults = number/100;

        setInput(calcResults.toString());
    };


    const squareHandler = () => {
        let number = numberInput ? numberInput : storedNumber;
        
        setPressedOps(true)

        let calcResults = number * number;

        setInput(calcResults.toString());
    };


    const clearHandler = (input) => {
        if (input === "A/C") {
          setOperator("");
          setStoredNumber("0");
          setBeforeValues({"storedVal":"", "storedOp": ""});
          setPressedParentheses(false);
        }
        setInput("0");
    };


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


    const negPosOp = () => {
      let num =numberInput ? numberInput : storedNumber
      setInput((Number(num) * -1).toString())
    } 
    

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
 

    const functionDictionary = {
        "+/-" : negPosOp, 
        "calculation": calculationHandler,
        "clear": clearHandler,
        "numberInput" : numberInputHandler,
        "operation": operationHandler,
        "parentheses": parenthesesHandler,
        "percent": percentHandler,
        "squareRoot": squareRootHandler,
        "square": squareHandler,
        
    }
    
  return (
    <div className = "calcContainer">

         
            {/* <div className = "parenthesesPrompt" id = {pressedParentheses ? "" : "non-visible"} >( Calculating Value )</div> */}
            <Display 
            numberInput = {numberInput} 
            storedNumber= {storedNumber}
            parenthesesOn = {pressedParentheses}
            />
        
        
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