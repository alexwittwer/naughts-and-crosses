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

    // check for valid input
    if (x < 0 || x > 2 || y < 0 || y > 2) {
      alert("Error, out of bounds");
      return false;
    } else if (!board[x][y]) {
      board[x][y] = marker;
      switchPlayer(currentPlayer);
      play();
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
        alert(`${marker} wins`);
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
        alert(`${marker} wins`);
        return true;
      }
    }

    // check diagonals
    if (
      board[0][0] === marker &&
      board[1][1] === marker &&
      board[2][2] === marker
    ) {
      alert(`${marker} wins`);
      return true;
    }

    if (
      board[0][2] === marker &&
      board[1][1] === marker &&
      board[2][0] === marker
    ) {
      alert(`${marker} wins`);
      return true;
    }

    //exits if no win conditions met
    return false;
  }

  // simplifies checkWin for both markers.
  function checkWin() {
    initCheckWin("x");
    initCheckWin("o");
  }

  function checkValid(coords) {
    let [x, y] = coords;
    let board = gameBoard.displayBoard();

    if (board[x][y]) {
      return false;
    }
    return true;
  }

  //checks if all elements have a marker, then stops the game
  function checkTie() {
    // ends prematurely if theres win conditions
    if (checkWin) {
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
      alert(`${currentPlayer.name} wins!`);
    } else if (checkTie()) {
      alert(`Its a tie!`);
    } else {
      return;
    }
  }

  function switchPlayer() {
    if (gameController.currentPlayer === gameController.player1) {
      gameController.currentPlayer = gameController.player2;
    } else {
      gameController.currentPlayer = gameController.player1;
    }
    return;
  }

  return { play, setToken };
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

const gameDOM = (() => {
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

  // New Game button handler
  newgame.addEventListener("click", (e) => {
    gameBoard.resetBoard();
    fullReset();
  });

  // Reset button handler
  resetbtn.addEventListener("click", (e) => {
    gameBoard.resetBoard();
    reset();
  });

  // clears grid from grid-container
  function clearBoard() {
    const grid = document.querySelector(".grid-container");
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
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
          game.setToken(coords, player1.marker);
          reset();
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

  // quick reset function
  function reset() {
    clearBoard();
    populateBoard();
  }

  // full reset and opens modal for new game initialization
  function fullReset() {
    reset();
    openMdl();
  }

  // modal handling
  let player1;
  let player2;

  closeModal.addEventListener("click", () => {
    closeMdl();
  });

  // play button should return players and their markers
  play.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(p1.value);
    console.log(p2.value);
    player1 = createPlayer(p1.value, "x");
    player2 = createPlayer(p2.value, "o");
    closeMdl();
  });

  //close modal
  function closeMdl() {
    modalForm.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  //open modal
  function openMdl() {
    modalForm.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  return { reset, fullReset, openMdl };
})();

gameDOM.reset();
