const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const toggleHistoryBtn = document.getElementById("toggle-history");
const historyPanel = document.getElementById("history-panel");

let input = "";

// Input buttons
document.querySelectorAll(".btn").forEach(btn => {
  const value = btn.getAttribute("data-value");
  if (value) {
    btn.addEventListener("click", () => {
      input += value;
      updateDisplay();
    });
  }
});

document.getElementById("clear").addEventListener("click", () => {
  input = "";
  updateDisplay();
});

document.getElementById("backspace").addEventListener("click", () => {
  input = input.slice(0, -1);
  updateDisplay();
});

document.getElementById("plus-minus").addEventListener("click", () => {
  try {
    let result = eval(input);
    result = -result;
    input = result.toString();
    updateDisplay();
  } catch {
    input = "";
    display.textContent = "Error";
  }
});

document.getElementById("equals").addEventListener("click", evaluate);

function updateDisplay() {
  display.textContent = input || "0";
}

function evaluate() {
  try {
    const result = eval(input);
    if (result !== undefined) {
      addToHistory(input, result);
      input = result.toString();
      updateDisplay();
    }
  } catch {
    display.textContent = "Error";
    input = "";
  }
}

function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.insertBefore(li, historyList.firstChild);
}

clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});

toggleHistoryBtn.addEventListener("click", () => {
  historyPanel.classList.toggle("show");
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key) || "+-*/.".includes(key)) {
    input += key;
    updateDisplay();
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
    updateDisplay();
  } else if (key === "Enter") {
    e.preventDefault();
    evaluate();
  } else if (key === "Escape") {
    input = "";
    updateDisplay();
  }
});
