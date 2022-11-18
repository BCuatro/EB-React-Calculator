import React from 'react'
import "../calculator/Calculator.css"
import "./Display.css"
const Display = ({number}) => {

    const errorHandling = (number) =>{
        if(isNaN(number) && number !== "."){
            return "Error" 
        }

         if(number.toString().length > 15){
            return Number(number).toExponential(11).toString()
         }

        return number 
    }

    number = errorHandling(number)

    return (
        <div className= "display" id ={(number.length > 10 ) ? "textId" : ""}> {number}</div>
    )
}

export default Display