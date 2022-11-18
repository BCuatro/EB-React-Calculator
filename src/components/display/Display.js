import React from 'react'
import "./Calculator.css"
const Display = ({number}) => {

    const errorHandling = (number) =>{
        if(isNaN(number) && number !== "."){
            return "Error" 
        }

         if(number.toString().length > 15){
            return Number(number).toExponential(10).toString()
         }

        return number 
    }

    number = errorHandling(number)

    return (
        <div className= "display" id ={(number.length > 10 || number.length === undefined) ? "textId" : ""}> {number}</div>
    )
}

export default Display