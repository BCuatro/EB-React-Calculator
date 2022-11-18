import "./Instructions.css"

const InstructionItem = ({symbol, instruction}) => {
  return (
    <div className= "instructionContext">
        <div className = "symbolContainer" >
            <div className = "instructionSymbols"> {symbol} </div>
        </div>
        <div classNaem = "definitionContainer">
            <div className = "definition"> {instruction} </div>
        </div>
        
        

    </div>
  )
}
export default InstructionItem