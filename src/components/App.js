import Buttons from "./Buttons";
import Display from "./Display";
import { useState } from 'react';

function App() {
  const [expression, setExpression] = useState("")
  const [result, setResult] = useState("")
  const [display, setDisplay] = useState("0")
  const [memoryStore, setMemoryStore] = useState("")

  function calculateExpression(buttonClicked) {
    if(expression !== "" && result !== "") {
      setExpression(calculate(expression + result).toString() + buttonClicked)
      setDisplay(calculate(expression + result).toString())
    }
    else if(expression !== "" && result === "") {
      setExpression(expression + buttonClicked)
    }
    else {
      setExpression(result + buttonClicked)
    }
    console.log("expression " + expression, "result" + result)
    setResult("")
  }

  function handleButtonClicked(buttonClicked) {
    if(Number.isInteger(buttonClicked)) {
      if(result === memoryStore) {
        setResult(buttonClicked)
        setDisplay(buttonClicked)
      }
      else {
        setResult(result + buttonClicked)
        setDisplay(result + buttonClicked)
      }
    }
    else if(buttonClicked === ".") {
      if(!result.includes(".")) {
        setResult(result + buttonClicked)
        setDisplay(result + buttonClicked)
      }
    }
    else if(buttonClicked === "MS") {
      setMemoryStore(display)
    }
    else if(buttonClicked === "MR") {
      setResult(memoryStore)
      setDisplay(memoryStore)
    }
    else if(buttonClicked === "MC") {
      setMemoryStore("")
    }
    else if(buttonClicked === "M+") {
      if(memoryStore !== "") {
        setExpression(calculate(display + "+" + memoryStore).toString())
        setDisplay(calculate(display + "+" + memoryStore).toString())
        setResult("")
      }
    }
    else if(buttonClicked === "M-") {
      if(memoryStore !== "") {
        setExpression(calculate(memoryStore + "-" + display).toString())
        setDisplay(calculate(memoryStore + "-" + display).toString())
        setResult("")
      }
    }
    else if(buttonClicked === "AC") {
      setResult("")
      setExpression("")
      setDisplay("0")
    }
    else if(buttonClicked === "C") {
      setResult("")
      setDisplay("0")
    }
    else if(buttonClicked === "%") {
      console.log(parseFloat(result))
      if(result === "") {
        setExpression(calculate(parseFloat(expression) / 100).toString())
        setDisplay(calculate(parseFloat(expression) / 100).toString())
      }
      else {  
        setExpression(calculate(parseFloat(result) / 100).toString())
        setDisplay(calculate(parseFloat(result) / 100).toString())
      }
      setResult("")
    }
    else if(buttonClicked === "+" || buttonClicked === "-") {
      console.log("expression " + expression, "result" + result)
      calculateExpression(buttonClicked)
    }
    else if(buttonClicked === '\u00d7') {
      calculateExpression("*")
    }
    else if(buttonClicked === '\u00f7') {
      calculateExpression("/")
    }
    else if(buttonClicked === '+/-') {
      console.log("expression " + expression, "result" + result)
      if(result !== "" && expression !== "") {
        console.log("first")
        setResult(calculate(parseFloat(display) * -1).toString())
        setDisplay(calculate(parseFloat(display) * -1).toString())
      }
      else if(result === "" && expression !== "") {
        console.log("second")
        setExpression(calculate(parseFloat(expression) * -1).toString())
        setDisplay(calculate(parseFloat(expression) * -1).toString())
        setResult("")
      }
      else {
        console.log("third")
        setExpression(calculate(parseFloat(result) * -1).toString())
        setDisplay(calculate(parseFloat(result) * -1).toString())
        setResult("")
      }
    }
    else if(buttonClicked === '\u221a') {
      if(result === "") {
        setExpression(Math.sqrt(expression).toString())
        setDisplay(Math.sqrt(expression).toString())
      }
      else {
        setExpression(Math.sqrt(result).toString())
        setDisplay(Math.sqrt(result).toString())
      }
      setResult("")
    }
    else if(buttonClicked === "=") {
      console.log(expression + result)
      if(result !== "" && expression !== "") {
        setExpression(calculate(expression + result).toString())
        setDisplay(calculate(expression + result).toString())
        setResult("")
      }
      console.log("expression " + expression, "result" + result)
    }
  }

  function calculate(result) {
    return new Function('return ' + result)();
  }

  return (
    <div className="calculator">
      <h3>React Calculator</h3>
      <Display result = {display} />
      <Buttons handleButtonClicked={handleButtonClicked} />
    </div>
  );
  
}

export default App;
