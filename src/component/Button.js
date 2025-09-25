import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import { useCalculator } from "./CalculatorContext";

export default function Button({ name, orange, wide }) {
  const { onButtonPress } = useCalculator();

  const handleClick = () => onButtonPress(name);

  const className = [
    "component-button",
    orange ? "orange" : "",
    wide ? "wide" : "",
  ];

  return (
    <div className={className.join(" ").trim()}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Press ${name}`}
        className="calc-btn"
      >
        {name}
      </button>
    </div>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  orange: PropTypes.bool,
  wide: PropTypes.bool,
};
