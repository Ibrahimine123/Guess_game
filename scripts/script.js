let coinDouber = false;
let coins = parseInt(localStorage.getItem(' coins'));

if (!coins || isNaN(coins)) {
    coins = 100;
    localStorage.setItem('coins', coins);
}

if (coinDouber) {
    localStorage.setItem('attempts', '10');
}

function checkGuess() {
    let attempts = parseInt(localStorage.getItem('attempts'));
    if (!attempts || attempts <= 0) {
        attempts = 3;
        localStorage.setItem('attempts', attempts);
    }

    const guess = parseInt(document.getElementById('guessInput').value);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const resultDisplay = document.getElementById('result');

    if (guess === randomNumber) {
        resultDisplay.textContent = `Congratulations! You guessed the correct number (${randomNumber})!`;
        if (coinDouber) {
            coins += 200;
        } else {
            coins += 100
        }
        localStorage.setItem('coins', coins);
        document.getElementById('coinCount').textContent = coins;
        localStorage.setItem('attempts', 3);

        setTimeout(() => {
            resultDisplay.textContent = '';
            document.getElementById('guessInput').value = '';
        }, 2000);
    } else {
        attempts--;
        localStorage.setItem('attempts', attempts);
        if (attempts === 0) {
            resultDisplay.textContent = `You've used all your attempts! The correct number was ${randomNumber}.`;
            localStorage.setItem('attempts', 3);
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            resultDisplay.textContent = `Wrong guess! Try again. Attempts left: ${attempts}`;
        }
    }
}
