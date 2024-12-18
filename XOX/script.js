const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    
    if (gameBoard[index] || !gameActive) {
        return;
    }

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `${currentPlayer} qalib gəldi!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        messageElement.textContent = "Heç-heçə!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
}

function restartGame() {
    gameBoard = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = "";
}
