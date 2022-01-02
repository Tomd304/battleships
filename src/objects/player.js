const { createGameboard } = require("./gameboard");

const createPlayer = (name) => {
  let playerName = name;
  let board = createGameboard();
  let winner = false;
  let enemyBoard = "init";

  function setEnemyBoard(board) {
    this.enemyBoard = board;
  }

  function attackEnemy(x, y) {
    if (validInput(this.enemyBoard)) {
      this.enemyBoard.receiveAttack(x, y);
    }

    function validInput(enemyBoard) {
      if (enemyBoard.grid[x][y].attacked == true) {
        return false;
      }
      return true;
    }
  }
  return {
    playerName,
    board,
    winner,
    enemyBoard,
    setEnemyBoard,
    attackEnemy,
  };
};

export { createPlayer };
