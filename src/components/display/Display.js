import React from 'react'
import "../calculator/Calculator.css"
import "./Display.css"
const Display = ({numberInput, storedNumber, parenthesesOn}) => {

    let number = numberInput ? numberInput: storedNumber

    const errorHandling = (num) =>{
        if(isNaN(num) && num !== "."){
            return "Error" 
        }

         if(num.toString().length > 12){
            // if(Number(num).toExponential(10).toString().slice(Number(num).toExponential(10).toString().length-3)=== "e+0"){
            //    num = Number(num).toExponential(10).toString().slice(0,Number(num).toExponential(10).toString().length-3)
            //    return (Number(num) *1).toString()
            // }
            
            return Number(num).toExponential(12).toString()
         }

        return num
    }

    number = errorHandling(number)

    return (
        // <div className= "display" id ={(number.length > 10 ) ? "textId" : ""}> {number}</div>
        <div className = "displayContainer"> 
            <div className = "parenthesesPrompt" id = {parenthesesOn ? "" : "non-visible"} >( Calculating Value )</div>
            <div className= "display"> {number}</div>
            {/* <div className= "display" id ={(number.length < 15 ) ? "" : "textId"}> {number}</div> */}
        </div>
    )
}

export default Display