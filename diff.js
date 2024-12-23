
// Function to compute symbolic derivative
function diff(expr, variable) {
  const terms = expr.split(/(?=[+-])/); // Split expression into terms (preserving + and -)
  const results = [];

  terms.forEach(term => {
      // Match the term with optional coefficient, variable, and power
      const match = term.match(new RegExp(`([+-]?\\d+)?\\*?(${variable})?(\\^\\d+)?`));
      if (match) {
          const [, coeffStr, varPart, powerPart] = match;

          // Parse coefficient
          let coeff = coeffStr === "-" ? -1 : parseInt(coeffStr || (varPart ? "1" : "0"), 10);
          if (isNaN(coeff)) coeff = 1;

          // Parse power
          let power = parseInt((powerPart || "^1").slice(1), 10);
          if (isNaN(power)) power = varPart ? 1 : 0;

          if (varPart) {
              // If the term contains the variable
              if (power === 1) {
                  // If power is 1, derivative is just the coefficient
                  results.push(`${coeff}`);
              } else {
                  // For power > 1, apply power rule
                  results.push(`${coeff * power}*${variable}^${power - 1}`);
              }
          }
          // For constant terms, derivative is 0, so skip adding to results
      }
  });

  // Combine results and return
  return results.length > 0 ? results.join(" + ") : "0";
}

// Function to handle UI interaction
function computeDerivative() {
  const expression = document.getElementById("expression").value.trim();
  const variable = document.getElementById("variable").value.trim();
  const resultBox = document.getElementById("result");

  if (!expression || !variable) {
      resultBox.innerText = "Please provide both the expression and the variable.";
      return;
  }

  try {
      const derivative = diff(expression, variable);
      resultBox.innerText = `Derivative: ${derivative}`;
  } catch (error) {
      resultBox.innerText = "Error in computing derivative. Please check your input.";
  }
}
