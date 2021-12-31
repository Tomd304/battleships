import { createShip } from "./ship";

const createGameboard = () => {
  let gridSize = 8;
  let ships = [];
  createShips(4, 2);
  createShips(3, 3);
  createShips(2, 4);
  createShips(1, 5);

  let grid = createGrid(gridSize);
  initGrid();

  function createGrid(gridSize) {
    let grid = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      grid[i] = new Array(gridSize);
    }
    return grid;
  }

  function gameOver() {
    ships.forEach((ship) => {
      if (ship.sunk == false) {
        return false;
      }
    });
    return true;
  }

  function initGrid() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        grid[i][j] = { shipHere: false, attacked: false };
      }
    }
  }

  function createShips(quantity, length) {
    for (let i = 0; i < quantity; i++) {
      ships.push(createShip(length));
    }
  }

  function setShipLocation(shipNumber, x, y, horizontal = true) {
    for (let i = 0; i < ships[shipNumber].length; i++) {
      grid[x][y].shipHere = true;
      grid[x][y].shipIndex = shipNumber;
      if (horizontal) {
        x += 1;
      } else {
        y += 1;
      }
    }
  }

  function receiveAttack(x, y) {
    grid[x][y].attacked = true;
    if (grid[x][y].shipHere) {
      ships[grid[x][y].shipIndex].markHit(x, y);
      if (ships[grid[x][y].shipIndex].allHit()) {
        ships[grid[x][y].shipIndex].sinkSelf();
      }
    }

    return true;
  }

  function gameOver() {
    this.enemyBoard.ships.forEach((ship) => {
      if (ship.sunk == false) {
        return false;
      }
    });
    return true;
  }

  return { grid, ships, setShipLocation, receiveAttack, gameOver };
};

export { createGameboard };
