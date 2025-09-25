Calculator
---
<img src="Logotype primary.png" width="60%" height="60%" />

Created with create-react-app. See the full create-react-app guide.

Architecture (Post-migration)
---
- Functional components with hooks
- Centralized state using CalculatorContext (Context + custom hook)
- Declarative ButtonPanel; stateless Button components
- Display consumes context and formats output
- Keyboard support (0–9, operators, Enter, Escape, Backspace)
- Accessibility: roles, aria-live for display, focus-visible styles
- Responsive UI with improved contrast and touch targets

Refer to kavia-docs/jquery-to-react-calculator-migration-guide.md for rationale and best practices that guided this migration.

Install
---
npm install

Usage
---
npm start
