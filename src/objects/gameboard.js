import { createShip } from "./ship";

const createGameboard = () => {
  let gridSize = 8;
  let ships = [];
  let index = 0;
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
      ships.push(createShip(length, index));
      index++;
    }
  }

  function setShipLocation(ship, x, y) {
    for (let i = 0; i < ship.length; i++) {
      grid[x][y].shipHere = true;
      grid[x][y].shipIndex = ship.index;
      if (ship.horizontal) {
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
  }

  function gameLost() {
    let lost = true;
    ships.forEach((ship) => {
      if (ship.sunk == false) {
        lost = false;
      }
    });
    return lost;
  }

  return { grid, ships, setShipLocation, receiveAttack, gameLost };
};

export { createGameboard };
