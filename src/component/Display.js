import React, { useMemo } from "react";
import "./Display.css";
import { useCalculator } from "./CalculatorContext";

/**
 * PUBLIC_INTERFACE
 * Display renders the current calculator output, combining total, operation, and next.
 */
const Display = () => {
  const { total, next, operation, formatDisplay } = useCalculator();

  const screen = useMemo(() => {
    if (next != null) return formatDisplay(next);
    if (total != null) return formatDisplay(total);
    return "0";
  }, [total, next, formatDisplay]);

  const ariaLive = next != null ? "assertive" : "polite";

  return (
    <div className="component-display" role="group" aria-label="Calculator display">
      <output className="display-output" aria-live={ariaLive} aria-atomic="true">
        {screen}
      </output>
      <div className="display-secondary" aria-hidden="true">
        {total != null ? formatDisplay(total) : ""} {operation || ""} {next || ""}
      </div>
    </div>
  );
};

export default Display;
