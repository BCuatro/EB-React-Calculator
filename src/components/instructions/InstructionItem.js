import React from 'react'
import "./Instructions.css"

//Component that formats each instruction line item
const InstructionItem = ({symbol, instruction}) => {
  return (
    <div className= "instructionContext">
        <div className = "symbolContainer" >
            <div className = "instructionSymbols"> {symbol} </div>
        </div>
        <div className = "definitionContainer">
            <div className = "definition"> {instruction} </div>
        </div>
        
        

    </div>
  )
}
export default InstructionItem