const result = document.getElementById('result');
const cells = document.querySelectorAll('#board td');

const board = Array(9).fill('');
let player = 'X';
let gameActive = true;

cells.forEach((cell, index) => {
  cell.addEventListener('click', function () {
    if (gameActive && board[index] === '') {
      board[index] = player;
      cell.innerHTML = player;
      const winningCombination = checkWin(player);
      if (winningCombination) {
        announceWinner(player, winningCombination);
      } else if (!board.includes('')) {
        announceDraw();
      } else {
        player = 'O';
        computerPlay();
      }
    }
  });
});

function checkWin(mark) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const condition of winConditions) {
    if (condition.every((index) => board[index] === mark)) {
      return condition;
    }
  }
  return null;
}

function announceWinner(winner, winningCombination) {
  result.innerText = `THE WINNER IS ${winner}!`;
  gameActive = false;
  winningCombination.forEach((index) => {
    cells[index].classList.add('highlight');
  });
  setTimeout(resetBoard, 3000);
}

function announceDraw() {
  result.innerText = `IT'S A DRAW!`;
  gameActive = false;
  setTimeout(resetBoard, 3000);
}

function resetBoard() {
  board.fill('');
  cells.forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('highlight');
  });
  player = 'X';
  result.innerText = '';
  gameActive = true;
}

function computerPlay() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  board[move] = 'O';
  cells[move].innerHTML = 'O';

  if (checkWin('O')) {
    announceWinner('O', checkWin('O'));
  } else if (!board.includes('')) {
    announceDraw();
  } else {
    player = 'X';
  }
}

function minimax(board, depth, isMaximizing) {
  if (checkWin('O')) return 1;
  if (checkWin('X')) return -1;
  if (!board.includes('')) return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;
  const newPlayer = isMaximizing ? 'O' : 'X';

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = newPlayer;
      let score = minimax(board, depth + 1, !isMaximizing);
      board[i] = '';
      bestScore = isMaximizing
        ? Math.max(score, bestScore)
        : Math.min(score, bestScore);
    }
  }
  return bestScore;
}
