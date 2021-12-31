const { createGameboard } = require("./gameboard");

const createPlayer = (name) => {
  let playerName = name;
  let board = createGameboard();
  let winner = false;
  let enemyBoard;

  function setEnemyBoard(enemy) {
    enemyBoard = enemy.board;
  }
  return { playerName, board, winner, enemyBoard, setEnemyBoard };
};

export { createPlayer };
