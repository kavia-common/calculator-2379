import React from "react";
import Button from "./Button";
import "./ButtonPanel.css";

/**
 * PUBLIC_INTERFACE
 * ButtonPanel renders the grid of calculator buttons. Logic is handled via context.
 */
export default function ButtonPanel() {
  return (
    <div className="component-button-panel" role="group" aria-label="Calculator buttons">
      <div>
        <Button name="AC" />
        <Button name="⌫" />
        <Button name="+/-" />
        <Button name="%" />
        <Button name="÷" orange />
      </div>
      <div>
        <Button name="7" />
        <Button name="8" />
        <Button name="9" />
        <Button name="x" orange />
      </div>
      <div>
        <Button name="4" />
        <Button name="5" />
        <Button name="6" />
        <Button name="-" orange />
      </div>
      <div>
        <Button name="1" />
        <Button name="2" />
        <Button name="3" />
        <Button name="+" orange />
      </div>
      <div>
        <Button name="0" wide />
        <Button name="." />
        <Button name="=" orange />
      </div>
    </div>
  );
}
