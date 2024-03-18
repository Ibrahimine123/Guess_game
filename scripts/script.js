let coins = parseInt(localStorage.getItem('coins'));

if (!coins || isNaN(coins)) {
    coins = 100;
    localStorage.setItem('coins', coins);
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
        coins += 100; 
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
            if (guess !== randomNumber) {
                resultDisplay.textContent = `You've used all your attempts! The correct number was ${randomNumber}.`;
                localStorage.setItem('attempts', 3); 
                setTimeout(() => {
                    location.reload(); 
                }, 2000);
            }
        } else {
            resultDisplay.textContent = `Wrong guess! Try again. Attempts left: ${attempts}`;
        }
    }
}

// Load initial coin count and purchase history when the page loads
window.onload = function () {
    const coinCountElement = document.getElementById('coinCount');
    coinCountElement.textContent = localStorage.getItem('coins') || '100';

    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    updatePurchaseHistory(purchaseHistory);
};

// Function to handle item purchases
function purchaseItem(itemName, itemPrice) {
    let coins = parseInt(localStorage.getItem('coins')) || 100;

    if (coins >= itemPrice) {
        const confirmPurchase = confirm(`Are you sure you want to purchase ${itemName} for ${itemPrice} coins?`);
        if (confirmPurchase) {
            coins -= itemPrice;
            localStorage.setItem('coins', coins);

            // Add purchase to history
            const purchaseDate = new Date().toLocaleString();
            const purchase = { itemName, itemPrice, purchaseDate };
            const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
            purchaseHistory.push(purchase);
            localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

            // Update UI
            const coinCountElement = document.getElementById('coinCount');
            coinCountElement.textContent = coins;
            updatePurchaseHistory(purchaseHistory);
        }
    } else {
        alert('Insufficient coins to purchase this item.');
    }
}

// Function to update the purchase history UI
function updatePurchaseHistory(purchaseHistory) {
    const purchaseListElement = document.getElementById('purchaseList');
    purchaseListElement.innerHTML = ''; // Clear previous entries

    purchaseHistory.forEach(purchase => {
        const listItem = document.createElement('li');
        listItem.textContent = `${purchase.itemName} - Price: ${purchase.itemPrice} coins, Purchased on: ${purchase.purchaseDate}`;
        purchaseListElement.appendChild(listItem);
    });
}

// Do not Touch please
window.onload = function() {
    const coinCountElement = document.getElementById('coinCount');
    coinCountElement.textContent = coins;
};
