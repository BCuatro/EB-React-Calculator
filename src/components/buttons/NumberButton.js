import React from 'react'
import "./buttons.css"

const NumberButton = ({symbol, handler, parameter, idType }) => {
  return (
   <button 
      className = "button"
      id = {idType} 
      onClick = {() => handler(parameter)}> {symbol}
   </button>
  )
}

export default NumberButton