let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.addEventListener('DOMContentLoaded', setupGame);

function setupGame() {
    const board = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    updateStatus();
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        switchPlayer();
        updateStatus();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            displayWinner(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        displayDraw();
    }
}

function displayWinner(winner) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = `Player ${winner} wins!`;
    gameActive = false;
}

function displayDraw() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'It\'s a draw!';
    gameActive = false;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    updateStatus();
}
