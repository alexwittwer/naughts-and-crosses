//
// ---------- Game Board Object ------------ //
//

const gameBoard = (() => {
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

  resetBoard(); // resets board for initialization.

  return { displayBoard, resetBoard };
})();

//
// ---------- Game Logic Object ------------ //
//

const gameController = (() => {
  const board = gameBoard.displayBoard();
  let player1;
  let player2;
  let currentPlayer;

  // sets token based on coordinates
  // expects array
  function setToken(coords, marker) {
    // change coords to x, y
    const x = coords[0];
    const y = coords[1];
    if (!board[x][y]) {
      board[x][y] = marker;
      play();
      switchPlayer(currentPlayer);
      return board;
    } else {
      console.log("Error: token in place");
      return false;
    }
  }

  // checks to see if a marker has been placed in the win conditions
  function initCheckWin(marker) {
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

  // simplifies checkWin for both markers.
  function checkWin() {
    if (initCheckWin("x") || initCheckWin("o")) {
      return true;
    }
  }

  //checks if all elements have a marker, then stops the game
  function checkTie() {
    // ends prematurely if theres win conditions
    if (checkWin()) {
      return;
    }
    let setFlag = true;
    for (let i = 0; i < 3; i++) {
      //loop for each, return false if it doesn't contain a marker
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          setFlag = false;
        }
      }
    }

    return setFlag;
  }

  // main game logic
  function play() {
    if (checkWin()) {
      screenController.displayWinner(gameController.currentPlayer.name);
    } else if (checkTie()) {
      screenController.displayWinner("nobody!");
    } else {
      return;
    }
  }

  function resetCurrentPlayer() {
    gameController.currentPlayer = gameController.player1;
  }

  function switchPlayer() {
    if (gameController.currentPlayer === gameController.player1) {
      gameController.currentPlayer = gameController.player2;
    } else {
      gameController.currentPlayer = gameController.player1;
    }
    return;
  }

  return { play, setToken, resetCurrentPlayer };
})();

//
// ---------- Player Factory ------------ //
//

function Player(name, marker) {
  return { name, marker };
}

//
// ---------- DOM Handling Object ------------ //
//

const screenController = (() => {
  // Element pointers
  const resetbtn = document.querySelector(".reset-btn");
  const newgame = document.querySelector(".new-game-btn");

  // Modal Pointers
  const closeModal = document.querySelector("#close-btn");
  const modalForm = document.querySelector(".modal");
  const play = document.querySelector("#play-game-btn");
  const overlay = document.querySelector(".overlay");
  const p1 = document.querySelector("#mname1");
  const p2 = document.querySelector("#mname2");
  const winModal = document.querySelector(".winner-modal");
  const winClose = document.querySelector(".win-close-btn");
  const winner = document.querySelector("#winner");

  // New Game button handler
  newgame.addEventListener("click", (e) => {
    gameBoard.resetBoard();
    fullReset();
  });

  // Reset button handler
  resetbtn.addEventListener("click", (e) => {
    gameBoard.resetBoard();
    gameController.resetCurrentPlayer();
    resetDOM();
  });

  // win modal handling
  winClose.addEventListener("click", (e) => {
    e.preventDefault();
    toggleWinner();
    gameBoard.resetBoard();
    gameController.resetCurrentPlayer();
    resetDOM();
  });

  //close win modal
  function toggleWinner() {
    winModal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }

  // displays winner
  function displayWinner(name) {
    winner.textContent = `Winner: ${name}`;
    toggleWinner();
  }

  // modal handling
  closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
  });

  // play button should return players and their markers
  play.addEventListener("click", (e) => {
    e.preventDefault();
    gameController.player1 = Player(p1.value, "x");
    gameController.player2 = Player(p2.value, "o");
    // set current player
    gameController.resetCurrentPlayer();
    toggleModal();
  });

  //close modal
  function toggleModal() {
    modalForm.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }

  // clears grid from grid-container
  function clearBoard() {
    const grid = document.querySelector(".grid-container");
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
  }

  // quick reset function
  function resetDOM() {
    clearBoard();
    populateBoard();
  }

  // full reset and opens modal for new game initialization
  function fullReset() {
    resetDOM();
    gameBoard.resetBoard();
    toggleModal();
  }

  // updates grid with current board
  function populateBoard() {
    const board = gameBoard.displayBoard();

    for (let i = 0; i < 3; i++) {
      const grid = document.querySelector(".grid-container");
      for (let j = 0; j < 3; j++) {
        const grid_element = document.createElement("div");
        grid_element.classList.add("grid-item");
        grid_element.addEventListener("click", (e) => {
          // adds a unique event listener to each grid item
          const coords = [i, j];
          gameController.setToken(coords, gameController.currentPlayer.marker);
          resetDOM();
        });

        // checks to see if game logic board has a value, then places an icon in that grid item
        if (board[i][j] === "x") {
          grid_element.innerHTML = '<img src="icons/cancel-svgrepo-com.svg">';
        } else if (board[i][j] === "o") {
          grid_element.innerHTML = '<img src="icons/circle-svgrepo-com.svg">';
        } else {
          grid_element.textContent = board[i][j];
        }
        grid.appendChild(grid_element);
      }
    }
  }

  return { resetDOM, displayWinner };
})();

screenController.resetDOM();
