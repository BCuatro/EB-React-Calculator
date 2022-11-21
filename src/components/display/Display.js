import React from 'react'
import "../calculator/Calculator.css"
import "./Display.css"

//Component for the calculator number display.
const Display = ({numberInput, storedNumber, parenthesesOn}) => {

    let number = numberInput ? numberInput: storedNumber

    //Function to handle the errors and scientific notion for the displayed value.
    const errorHandling = (num) =>{
        if(isNaN(num) && num !== "."){
            return "Error" 
        }
        //Scientific notion conversion.
         if(num.toString().length > 12){
            let sciNotation =Number(num).toExponential(num.length > 12 ? 6 : num.length).toString()
            if(sciNotation.slice(sciNotation.length-3).includes("e+0")){
               num = sciNotation.slice(0,sciNotation.length-3)
               return (Number(num) *1).toString()
            }

            return Number(num).toExponential(num.length > 12 ? 6 : num.length ).toString()

         }
            
        return num
    }

    number = errorHandling(number)

    return (
        <div className = "displayContainer"> 
            {/* Display prompt to let user know they activated parentheses mode. */}
            <div className = "parenthesesPrompt" id = {parenthesesOn ? "" : "non-visible"} >( Calculating Value )</div>
            <div className= "display"> {number}</div>
        </div>
    )
}

export default Display