const result = document.getElementById('result');
const cells = document.querySelectorAll('#board td');

const board = ['', '', '', '', '', '', '', '', '']; // represents the board
let player = 'X'; // player starts with X

// Adds event listeners to each cell of the board
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function () {
    if (this.innerHTML === '') {
      // if the cell is empty
      this.innerHTML = player; // fill it with the current player's mark
      board[this.id] = player; // update the board array
      //   console.log(board);
      if (checkWin(player)) {
        // check if the player has won
        result.innerText = `THE WINNER IS ${player}!`;
        setTimeout(resetBoard, 3000);
        // resetBoard(); // reset the game
      } else {
        player = 'O'; // change the player
        computerPlay();
      }
    }
  });
}

// Resets the board to its initial state
function resetBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    board[i] = '';
  }
  player = 'X'; // player starts with X
  result.innerText = '';
}

// Checks if the given player has won
function checkWin(mark) {
  // Check rows
  if (
    (board[0] === mark && board[1] === mark && board[2] === mark) ||
    (board[3] === mark && board[4] === mark && board[5] === mark) ||
    (board[6] === mark && board[7] === mark && board[8] === mark)
  ) {
    return true;
  }
  // Check columns
  if (
    (board[0] === mark && board[3] === mark && board[6] === mark) ||
    (board[1] === mark && board[4] === mark && board[7] === mark) ||
    (board[2] === mark && board[5] === mark && board[8] === mark)
  ) {
    return true;
  }
  // Check diagonals
  if (
    (board[0] === mark && board[4] === mark && board[8] === mark) ||
    (board[2] === mark && board[4] === mark && board[6] === mark)
  ) {
    return true;
  }
  return false; // no winner yet
}

function computerPlay() {
  // find the first empty cell and fill it with O
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      document.getElementById(i.toString()).innerHTML = 'O';
      board[i] = 'O';
      if (checkWin('O')) {
        // check if the computer has won
        result.innerText = `THE WINNER IS O!`;
        setTimeout(resetBoard, 3000);
      } else {
        player = 'X'; // change the player
      }
      return; // exit the function
    }
  }
  // no empty cells, the game is a tie
  result.innerText = `IT'S A DRAW!`;
  setTimeout(resetBoard, 3000);
}
