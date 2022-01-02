import { createGameboard, setShipLocation, receiveAttack } from "./gameboard";

it("create default 8x8 grid", () => {
  let board = createGameboard();
  expect(board.grid.length).toBe(8);
  for (let i = 0; i < 8; i++) {
    expect(board.grid[i].length).toBe(8);
    for (let j = 0; j < 8; j++) {
      expect(board.grid[i][j].shipHere).toBe(false);
    }
  }
});

it("create ships", () => {
  let board = createGameboard();
  expect(board.ships.length).toBe(10);
});

it("place ship to grid, default orientation", () => {
  let board = createGameboard();
  board.setShipLocation(0, 3, 5);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i == 3 && j == 5) {
        expect(board.grid[i][j].shipHere).toBe(true);
      } else if (i == 4 && j == 5) {
        expect(board.grid[i][j].shipHere).toBe(true);
      } else {
        expect(board.grid[i][j].shipHere).toBe(false);
      }
    }
  }
});

it("place ship to grid, vertical orientation", () => {
  let board = createGameboard();
  board.setShipLocation(5, 2, 2, false);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i == 2 && j == 2) {
        expect(board.grid[i][j].shipHere).toBe(true);
      } else if (i == 2 && j == 3) {
        expect(board.grid[i][j].shipHere).toBe(true);
      } else if (i == 2 && j == 4) {
        expect(board.grid[i][j].shipHere).toBe(true);
      } else {
        expect(board.grid[i][j].shipHere).toBe(false);
      }
    }
  }
});

it("general receieve attack", () => {
  let board = createGameboard();
  board.setShipLocation(5, 2, 2);
  board.receiveAttack(2, 2);
  board.receiveAttack(2, 3);
  board.receiveAttack(4, 2);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i == 2 && j == 2) {
        expect(board.grid[i][j].attacked).toBe(true);
      } else if (i == 2 && j == 3) {
        expect(board.grid[i][j].attacked).toBe(true);
      } else if (i == 4 && j == 2) {
        expect(board.grid[i][j].attacked).toBe(true);
      } else {
        expect(board.grid[i][j].attacked).toBe(false);
      }
    }
  }
});

it("repeat attacks to sink ship", () => {
  let board = createGameboard();
  board.setShipLocation(5, 2, 2);
  board.receiveAttack(2, 2);
  board.receiveAttack(3, 2);
  board.receiveAttack(4, 2);
  let shipNo = 0;
  board.ships.forEach((ship) => {
    if (shipNo == 5) {
      expect(ship.sunk).toBe(true);
    } else {
      expect(ship.sunk).toBe(false);
    }
    shipNo++;
  });
});
