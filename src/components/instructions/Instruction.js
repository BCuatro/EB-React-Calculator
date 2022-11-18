import React from 'react'
import BASICOPERATORS from "../buttons/button-data/BasicOperations.json"
import SPECIALOPERATORS from "../buttons/button-data/SpecialOperations.json"
import ADDITIONALOPERATORS from "../buttons/button-data/AdditionalOperations.json"
import "./Instructions.css"
import InstructionItem from './InstructionItem';


const Instruction = () => {
  return (
    <div className = "instructionContainer">
        <h2>Button Definition</h2>
       <ul>
        {BASICOPERATORS.map(BasicOp => (
            <InstructionItem 
                key ={`Int-${BasicOp.id}`}
                symbol = {BasicOp.btnSymbol} 
                instruction = {BasicOp.instruction}
            />
        ))}
        {SPECIALOPERATORS.map(SpecialOp => (
            <InstructionItem 
                key ={`Int-${SpecialOp.id}`}
                symbol = {SpecialOp.btnSymbol} 
                instruction = {SpecialOp.instruction}
            />
        ))}
        {ADDITIONALOPERATORS.map(AdditionalOp => (
            <InstructionItem 
                key ={`Int-${AdditionalOp.id}`}
                symbol = {AdditionalOp.btnSymbol} 
                instruction = {AdditionalOp.instruction}
            />
        ))}

            
       </ul>
       
    </div>
  )
}

export default Instruction