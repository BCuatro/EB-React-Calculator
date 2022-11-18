import React from 'react'
import "./buttons.css"

const NumberButton = ({symbol, handler, parameter, classType, idType }) => {
  return (
   <button 
      className = "button"
      id = {idType} 
      onClick = {() => handler(parameter)}> {symbol}
   </button>
  )
}

export default NumberButton