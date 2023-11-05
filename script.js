const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create array / clears board
  function resetBoard() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(" ");
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

const game = (() => {
  const board = gameBoard.displayBoard();

  function checkWin(marker) {
    // check rows
    for (let x = 0; x < 3; x++) {
      if (
        board[x][0] === marker &&
        board[x][1] === marker &&
        board[x][2] === marker
      ) {
        return true;
      }
    }

    // check columns
    for (let y = 0; y < 3; y++) {
      if (
        board[0][y] === marker &&
        board[1][y] === marker &&
        board[2][y] === marker
      ) {
        return true;
      }
    }

    // check diagonals
    if (
      board[0][0] === marker &&
      board[1][1] === marker &&
      board[2][2] === marker
    ) {
      return true;
    }

    if (
      board[0][2] === marker &&
      board[1][1] === marker &&
      board[2][0] === marker
    ) {
      return true;
    }

    //exits if no win conditions met
    return false;
  }

  function checkTie() {
    for (let i = 0; i < 3; i++) {
      //loop for each, return false if it doesn't contain a marker
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") return true;
      }
    }
    return false;
  }

  function playRound() {
    const player_marker = "x";

    while (!checkWin("x") && !checkTie()) {
      let userinput_x = prompt("Enter coordinate x");
      let userinput_y = prompt("Enter coordinate y");
      let user_coord = [userinput_x, userinput_y];

      gameBoard.setToken(user_coord, player_marker);
      console.log(gameBoard.displayBoard());
    }
  }
  return { checkWin, playRound, checkTie };
})();
