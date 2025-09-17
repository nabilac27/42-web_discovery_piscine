// Select elements
const inputs = document.querySelectorAll('.input-number'); // [0] = left, [1] = right
const operator = document.querySelector('.select-operator');
const button = document.querySelector('button[type="submit"]');

// Function to perform calculation
function calculate() {
    const left = Number(inputs[0].value);
    const right = Number(inputs[1].value);
    const op = operator.value;

    // Validate positive integers
    if (
        isNaN(left) || isNaN(right) ||
        left < 0 || right < 0 ||
        !Number.isInteger(left) || !Number.isInteger(right)
    ) {
        alert("Error :(");
        return;
    }

    // Division or modulo by zero
    if ((op === "/" || op === "%") && right === 0) {
        alert("It's over 9000!");
        console.log("It's over 9000!");
        return;
    }

    let result;
    switch(op) {
        case "+": result = left + right; break;
        case "-": result = left - right; break;
        case "*": result = left * right; break;
        case "/": result = left / right; break;
        case "%": result = left % right; break;
    }

    alert(`Result: ${result}`);
    console.log(`Result: ${result}`);
}

// Attach click event
button.addEventListener('click', calculate);

// Every 30 seconds, alert
setInterval(() => {
    alert('Please, use me...');
}, 30000);
