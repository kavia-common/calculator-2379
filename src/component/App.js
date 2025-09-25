import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import "./App.css";
import { CalculatorProvider } from "./CalculatorContext";

/**
 * PUBLIC_INTERFACE
 * App is the root component of the calculator UI.
 * It provides calculator state via CalculatorProvider and composes the Display and ButtonPanel.
 */
function App() {
  return (
    <CalculatorProvider>
      <div className="component-app" role="application" aria-label="Calculator">
        <Display />
        <ButtonPanel />
      </div>
    </CalculatorProvider>
  );
}

export default App;
