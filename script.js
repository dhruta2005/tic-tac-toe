document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = Array(9).fill('');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetButton.addEventListener('click', resetGame);

    function handleClick(e) {
        const index = e.target.dataset.index;

        if (board[index] !== '') return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            disableBoard();
        } else if (board.every(cell => cell !== '')) {
            statusText.textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function disableBoard() {
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }

    function resetGame() {
        board = Array(9).fill('');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick);
        });
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
});
