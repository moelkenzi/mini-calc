// Theme handling
const themeSwitcher = document.querySelector('.theme-toggle');
const calculator = document.querySelector('.calculator');
let currentTheme = 1;

// Set initial theme
calculator.setAttribute('data-theme', `theme-${currentTheme}`);
themeSwitcher.style.setProperty('--toggle-position', '2px');

// Event listener for theme switching
themeSwitcher.addEventListener('click', () => {
    currentTheme = (currentTheme % 3) + 1;
    calculator.setAttribute('data-theme', `theme-${currentTheme}`);
    themeSwitcher.style.setProperty('--toggle-position', `${(currentTheme - 1) * 16}px`);
});

// Calculator functionality
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
let currentValue = '';
let previousValue = null;
let operation = null;
let shouldResetScreen = false;

// Function to update the calculator display
function updateDisplay() {
    display.textContent = currentValue || '0';
}

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle number inputs and decimal point
        if ('0123456789.'.includes(value)) {
            if (shouldResetScreen) {
                currentValue = value;
                shouldResetScreen = false;
            } else {
                currentValue += value;
            }
        } 
        // Handle operation buttons
        else if ('+-x/'.includes(value)) {
            if (previousValue === null) {
                previousValue = currentValue;
                shouldResetScreen = true;
            } else if (!shouldResetScreen) {
                currentValue = calculate(previousValue, currentValue, operation);
                previousValue = currentValue;
                shouldResetScreen = true;
            } 
            operation = value;
        } 
        // Handle equals button
        else if (value === '=') {
            if (previousValue !== null && !shouldResetScreen) {
                currentValue = calculate(previousValue, currentValue, operation);
                previousValue = null;
                operation = null;
                shouldResetScreen = true;
            }
        } 
        // Handle reset button
        else if (value === 'RESET') {
            currentValue = '';
            previousValue = null;
            operation = null;
            shouldResetScreen = false;
        } 
        // Handle delete button
        else if (value === 'DEL') {
            currentValue = currentValue.slice(0, -1);
        }

        // Update the display after each button click
        updateDisplay();
    });
});

// Function to perform calculations
function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return (a + b).toString();
        case '-': return (a - b).toString();
        case 'x': return (a * b).toString();
        case '/': return (a / b).toString();
        default: return b.toString();
    }
}

// Initial display update
updateDisplay();
