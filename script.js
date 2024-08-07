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

  playerOne.changePlayerName("Angelo");
  playerTwo.changePlayerName("Coco");

  let activePlayer = playerOne;
  let toGoFirstNextRound = playerTwo;

  const tictactoe = GameBoard();

  const switchTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    tictactoe.printBoard();
    console.log(`${getActivePlayer().getName()}'s turn.`);
  };

  const startNewRound = () => {
    activePlayer = toGoFirstNextRound;

    toGoFirstNextRound = activePlayer === playerOne ? playerTwo : playerOne;

    tictactoe.resetBoard();
    printNewRound();
  };

  const playRound = (row, column) => {
    console.log(
      `Placing ${getActivePlayer().getName()}'s token into position ${row}, ${column}`
    );

    //If the chosen spot is empty
    if (tictactoe.checkSpotEmpty(row, column)) {
      //Place the token down
      tictactoe.placeToken(row, column, activePlayer.getToken());

      //Check for a winner
      let winnerToken = tictactoe.checkForWinner();

      //Winner occured
      if (winnerToken !== null) {
        let winningPlayer =
          winnerToken === playerOne.getToken() ? playerOne : playerTwo;

        //Congratulate winner
        console.log(
          `Congratulations!, ${winningPlayer.getName()} wins the match!`
        );
        startNewRound();
      } else {
        switchTurn();
        printNewRound();
      }
    } else {
      console.log("Cannot place token here, repeat turn.");
      printNewRound();
    }
  };

  return {
    switchTurn,
    getActivePlayer,
    printNewRound,
    playRound,
    startNewRound,
  };
}

/*
const tictactoe = GameBoard();

tictactoe.printBoard();

tictactoe.placeToken(2, 2, 2);

tictactoe.printBoard();

tictactoe.placeToken(1, 2, 2);

tictactoe.printBoard();
*/

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

/* Add cell functionality if needed
function Cell() {

}
*/
