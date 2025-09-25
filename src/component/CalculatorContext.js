import React, { createContext, useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import calculate from '../logic/calculate';
import operate from '../logic/operate';

/**
 * CalculatorContext provides state and actions for the calculator.
 * It centralizes the logic and enables components to consume via hooks.
 */
const CalculatorContext = createContext(null);

/**
 * mapKeyToButton maps keyboard keys to calculator button labels.
 */
const mapKeyToButton = (key) => {
  const k = key.toLowerCase();
  if (k === 'enter' || k === '=') return '=';
  if (k === 'escape') return 'AC';
  if (k === 'backspace') return '⌫';
  if (['+', '-', '*', '/', '%'].includes(k)) return k === '*' ? 'x' : k === '/' ? '÷' : k;
  if (k === '.') return '.';
  if (k === ',') return '.';
  if (k === 'n') return '+/-';
  if (k >= '0' && k <= '9') return k;
  return null;
};

/**
 * formatDisplay ensures user-friendly output formatting.
 */
const formatDisplay = (value) => {
  if (value == null || value === '') return '0';
  // Avoid scientific notation for common results, trim trailing zeros
  const asString = String(value);
  if (asString.includes('e')) return asString;
  if (asString.includes('.')) {
    return asString.replace(/\.?0+$/, '');
  }
  return asString;
};

/**
 * PUBLIC_INTERFACE
 * useCalculator is a hook to access calculator state and actions.
 * Returns: { total, next, operation, onButtonPress }
 */
export const useCalculator = () => {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return ctx;
};

/**
 * PUBLIC_INTERFACE
 * CalculatorProvider wraps children and provides calculator state and keyboard handling.
 */
export const CalculatorProvider = ({ children }) => {
  const [state, setState] = useState({ total: null, next: null, operation: null });

  const onButtonPress = useCallback((buttonName) => {
    setState((prev) => {
      try {
        // Support custom backspace action handled here
        if (buttonName === '⌫') {
          const { next } = prev;
          if (next) {
            const trimmed = String(next).slice(0, -1);
            return { ...prev, next: trimmed.length ? trimmed : null };
          }
          return prev;
        }
        return calculate(prev, buttonName);
      } catch (e) {
        // On unexpected error, reset gracefully
        return { total: 'Error', next: null, operation: null };
      }
    });
  }, []);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e) => {
      const mapped = mapKeyToButton(e.key);
      if (mapped) {
        e.preventDefault();
        onButtonPress(mapped);
      }
    },
    [onButtonPress]
  );

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  const value = useMemo(
    () => ({
      total: state.total,
      next: state.next,
      operation: state.operation,
      onButtonPress,
      formatDisplay,
      operate, // exposed for potential advanced buttons if needed
    }),
    [state, onButtonPress]
  );

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
};

export default CalculatorContext;
