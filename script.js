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
            statusText.textContent = currentPlayer === 'X' ? "Friend Wins!" : "Dhruta Wins!";
            drawWinningLine();
            disableBoard();
        } else if (board.every(cell => cell !== '')) {
            statusText.textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = currentPlayer === 'X' ? "Friend's Turn" : "Dhruta's Turn";
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }

    function drawWinningLine() {
        const winningCombination = winningCombinations.find(combination => {
            return combination.every(index => board[index] === currentPlayer);
        });

        if (winningCombination) {
            const [a, b, c] = winningCombination;
            const cellA = document.querySelector(`.cell[data-index="${a}"]`);
            const cellB = document.querySelector(`.cell[data-index="${b}"]`);
            const cellC = document.querySelector(`.cell[data-index="${c}"]`);

            const line = document.createElement('div');
            line.classList.add('winning-line');
            document.body.appendChild(line);

            const rectA = cellA.getBoundingClientRect();
            const rectC = cellC.getBoundingClientRect();

            const angle = Math.atan2(rectC.top - rectA.top, rectC.left - rectA.left);
            const length = Math.sqrt(Math.pow(rectC.left - rectA.left, 2) + Math.pow(rectC.top - rectA.top, 2));

            line.style.width = `${length}px`;
            line.style.transform = `rotate(${angle}rad)`;
            line.style.top = `${rectA.top + rectA.height / 2}px`;
            line.style.left = `${rectA.left + rectA.width / 2}px`;
        }
    }

    function disableBoard() {
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }

    function resetGame() {
        board = Array(9).fill('');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#f0f0f0';
            cell.addEventListener('click', handleClick);
        });
        currentPlayer = 'X';
        statusText.textContent = "Friend's Turn";
        const line = document.querySelector('.winning-line');
        if (line) line.remove();
    }
});
