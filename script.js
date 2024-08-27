function GameBoard() {
  const board = [];

  //If you change this, it breaks checkForWinner
  const rows = 3;
  const columns = 3;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = 0;
    }
  }

  const getBoard = () => board;

  const checkSpotEmpty = (row, column) => {
    if (board[row][column] === 0) {
      return true;
    } else {
      return false;
    }
  };

  const placeToken = (row, column, token) => {
    //Check if its a valid placement
    if (row < 0 || row >= rows) {
      console.log("invalid row");
      return;
    }
    if (column < 0 || column >= columns) {
      console.log("invalid column");
      return;
    }

    //Make sure the place it is checking is empty
    if (checkSpotEmpty(row, column)) {
      board[row][column] = token;
    } else {
      console.log("Place taken already");
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.join(" ")).join("\n");
    console.log(boardWithCellValues);
  };

  //Returns the token of the winner
  const checkForWinner = () => {
    //Check Rows
    for (let i = 0; i < rows; i++) {
      if (
        board[i][0] !== 0 &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    //Check Columns
    for (let j = 0; j < columns; j++) {
      if (
        board[0][j] !== 0 &&
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j]
      ) {
        return board[0][j];
      }
    }

    //Check Top Left to Bottom Right
    if (
      board[0][0] !== 0 &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }

    //Check Top Right to Bottom Left

    if (
      board[0][2] !== 0 &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    //Check for a tie
    let allFilled = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (board[i][j] === 0) {
          allFilled = false;
          break;
        }
      }
    }

    if (allFilled) {
      return "tie";
    }

    //No winner
    return null;
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j] = 0;
      }
    }
  };

  return {
    getBoard,
    checkSpotEmpty,
    placeToken,
    printBoard,
    checkForWinner,
    resetBoard,
  };
}

function Player(name, token) {
  let playerName = name;
  const playerToken = token;

  const getName = () => playerName;

  const changePlayerName = (newName) => {
    playerName = newName;
  };

  const getToken = () => playerToken;

  return { getName, changePlayerName, getToken };
}

function gameController() {
  let playerOne = Player("Player One", 1);
  let playerTwo = Player("Player Two", 2);

  //playerOne.changePlayerName("Angelo");
  //playerTwo.changePlayerName("Coco");

  let activePlayer = playerOne;
  let toGoFirstNextRound = playerTwo;

  const tictactoe = GameBoard();

  const getBoard = () => tictactoe.getBoard();

  const getPlayerOne = () => playerOne;

  const getPlayerTwo = () => playerTwo;

  const switchTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    tictactoe.printBoard();
    console.log(`${getActivePlayer().getName()}'s turn.`);
  };

  //Take in function to be called
  const startNewRound = (turnMessage) => {
    activePlayer = toGoFirstNextRound;
    toGoFirstNextRound = activePlayer === playerOne ? playerTwo : playerOne;
    tictactoe.resetBoard();
    printNewRound();
    //Show the new starting player
    turnMessage(`${getActivePlayer().getName()}'s turn.`);
  };

  //Take in a row, column, and function to be called.
  const playRound = (row, column, turnMessage, winnerMessage) => {
    console.log(
      `Placing ${getActivePlayer().getName()}'s token into position ${row}, ${column}`
    );

    //If the chosen spot is empty
    if (tictactoe.checkSpotEmpty(row, column)) {
      //Place the token down
      tictactoe.placeToken(row, column, activePlayer.getToken());

      //Check for a winner
      let winnerToken = tictactoe.checkForWinner();

      //If tie
      if (winnerToken === "tie") {
        console.log("The game is a tie!");
        winnerMessage("The game is a tie!");
        startNewRound(turnMessage);
        //If winner is found
      } else if (winnerToken !== null) {
        let winningPlayer =
          winnerToken === playerOne.getToken() ? playerOne : playerTwo;

        //Congratulate winner
        console.log(
          `Congratulations! ${winningPlayer.getName()} wins the match!`
        );
        winnerMessage(
          `Congratulations! ${winningPlayer.getName()} wins the match!`
        );
        startNewRound(turnMessage);
        //If game is still going
      } else {
        switchTurn();
        //Display the current turn
        turnMessage(`${getActivePlayer().getName()}'s turn.`);
        printNewRound();
      }
    } else {
      console.log("Cannot place token here, repeat turn.");
      //displayMessage(`${getActivePlayer().getName()}'s turn.`);
      printNewRound();
    }
  };

  return {
    getBoard,
    getActivePlayer,
    playRound,
    startNewRound,
    getPlayerOne,
    getPlayerTwo,
  };
}

/*
const game = gameController();

game.printNewRound();
game.playRound(0, 0);
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);

game.playRound(0, 0);
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);
*/

function updateUI(cell, token) {
  if (cell.textContent === "") {
    cell.textContent = token === 1 ? "O" : "X";
  }
}

function screenController() {
  const cells = document.querySelectorAll(".cell");
  const game = gameController();
  const turnDiv = document.getElementById("turnStatus");
  const winnerDiv = document.getElementById("gameStatus");
  const changeNamesButton = document.getElementById("changeNamesButton");
  const closeDialogButton = document.getElementById("closeDialogButton");
  const saveNamesButton = document.getElementById("saveNamesButton");
  const resetButton = document.getElementById("resetButton");
  const dialog = document.getElementById("nameChangeDialog");

  const turnMessage = (message) => {
    turnDiv.textContent = message;
  };

  const winnerMessage = (message) => {
    winnerDiv.textContent = message;
  };

  //Display initial player turn
  turnMessage(`${game.getActivePlayer().getName()}'s turn.`);

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const row = parseInt(cell.getAttribute("data-row"));
      const col = parseInt(cell.getAttribute("data-col"));

      game.playRound(row, col, turnMessage, winnerMessage);
      updateScreen();
    });
  });

  resetButton.addEventListener("click", () => {
    game.startNewRound(turnMessage);
    updateScreen();
  });

  changeNamesButton.addEventListener("click", () => {
    const playerOneNameInput = document.getElementById("playerOneName");
    const playerTwoNameInput = document.getElementById("playerTwoName");

    playerOneNameInput.value = game.getPlayerOne().getName();
    playerTwoNameInput.value = game.getPlayerTwo().getName();
    dialog.showModal();
  });

  closeDialogButton.addEventListener("click", () => {
    dialog.close();
  });

  saveNamesButton.addEventListener("click", (event) => {
    event.preventDefault();

    const playerOneName = document.getElementById("playerOneName").value;
    const playerTwoName = document.getElementById("playerTwoName").value;

    game.getPlayerOne().changePlayerName(playerOneName);
    game.getPlayerTwo().changePlayerName(playerTwoName);

    turnMessage(`${game.getActivePlayer().getName()}'s turn.`);

    dialog.close();
  });

  const updateScreen = () => {
    const board = game.getBoard();

    board.forEach((rowArray, rowIndex) => {
      rowArray.forEach((cellValue, colIndex) => {
        const cell = document.querySelector(
          `.cell[data-row="${rowIndex}"][data-col="${colIndex}"]`
        );

        if (cellValue === 1) {
          cell.textContent = "X";
        } else if (cellValue === 2) {
          cell.textContent = "O";
        } else {
          cell.textContent = "";
        }
      });
    });
  };
}

screenController();
