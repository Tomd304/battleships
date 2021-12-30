const { createGameboard } = require("./gameboard");

const createPlayer = (name) => {
  let playerName = name;
  let board = createGameboard();
  let shipCount = board.ships.length;
  let shipsSunk = 0;
  let winner = false;
};

export { createPlayer };
