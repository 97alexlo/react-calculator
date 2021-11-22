import { calculatorButtons } from "../globals/calculator-button-data";
import '../styles/buttons.css';

function Buttons({ handleButtonClicked }) {
    return (
      <div className="buttons">
      {calculatorButtons.map((button, i) => (
        <button 
            key = {i}
            onClick = {() => handleButtonClicked(button.text)} 
            className = {button.type} 
            id = {button.className}>
            {button.text}
        </button>
      ))}
    </div>
    )
}

export default Buttons


