import React from 'react'
import Calculator from './components/calculator/Calculator';
import './App.css'
import Instruction from './components/instructions/Instruction';


function App() {
  return (
    <div className="App">
      <h1> My React Calculator</h1>
      <main>
        <Calculator />
        <Instruction />
      </main>
    </div>
  );
}

export default App;
