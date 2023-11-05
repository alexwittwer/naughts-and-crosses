const gameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create array / clears board
  function resetBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("");
      }
    }
  }

  // displays the board (keeps board private)
  function displayBoard() {
    return board;
  }

  // sets token based on coordinates
  // expects array
  function setToken(coords, marker) {
    // change coords to x, y
    const x = coords[0];
    const y = coords[1];

    // check for valid input
    if (x < 0 || x > 3 || y < 0 || y > 3) {
      alert("Error, out of bounds");
      return;
    } else if (!board[x][y]) {
      board[x][y] = marker;
      return board;
    } else console.log("Error: token in place");
  }

  resetBoard(); // resets board for initialization.

  return { displayBoard, setToken, resetBoard };
})();

const game = (function () {
  const board = gameBoard.displayBoard();
  const winCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
  ];

  function checkWin(marker) {}
  return { checkWin };
})();
