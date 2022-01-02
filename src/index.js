import "./styles.css";
import { createPlayer } from "./objects/player";
import { placementPhase } from "./phases/placementPhase";
import { battlePhase } from "./phases/battlePhase";
import { winnerPhase } from "./phases/winnerPhase";

let player1 = {};
let player2 = {};
startGame();

//game loop
async function startGame() {
  let nameStorage = "";
  while (true) {
    console.log(nameStorage);
    if (nameStorage) {
      console.log(nameStorage + " is true");
    } else {
      console.log(nameStorage + " is false");
    }

    player1 = await getPlayer1(nameStorage);
    player2 = createPlayer("Computer");
    await placementPhase();
    setComputerBoard();
    player1.setEnemyBoard(player2.board);
    player2.setEnemyBoard(player1.board);
    let winner = await battlePhase(player1, player2);
    console.log(winner.playerName + "WINS!!!!");
    nameStorage = player1.playerName;
    await winnerPhase(player1, player2);
  }
}

function getPlayer1(nameStorage) {
  return new Promise((resolve, reject) => {
    if (nameStorage) {
      resolve(createPlayer(nameStorage));
    } else {
      document
        .querySelector("#start-game-btn")
        .addEventListener("click", () => {
          let nameInput = document.querySelector("#player-name-input").value;
          if (nameInput) {
            resolve(createPlayer(nameInput));
          } else {
            resolve(createPlayer("Player 1"));
          }
          document.querySelector("body").innerHTML = "";
          //appendBoard(1, "Enemy");
        });
    }
  });
}

function setPlayerBoard(tempBoard) {
  player1.board = tempBoard;
}

function setComputerBoard() {
  for (let i = 0; i < player2.board.ships.length; i++) {
    placeShipRandom(i);
  }

  function placeShipRandom(shipIndex) {
    let set = false;
    let x, y;
    while (set == false) {
      player2.board.ships[shipIndex].horizontal = Math.random() < 0.5;

      x = Math.floor(Math.random() * 8);
      y = Math.floor(Math.random() * 8);
      if (
        checkObstruction(
          x,
          y,
          player2.board.ships[shipIndex],
          player2.board.grid
        )
      ) {
        player2.board.setShipLocation(player2.board.ships[shipIndex], x, y);
        player2.board.ships[shipIndex].placeShip(x, y);
        player2.board.ships[shipIndex].placed = true;
        set = true;
      }
    }
  }

  function checkObstruction(x, y, ship, grid) {
    let length = ship.length;
    for (let i = 0; i < ship.length; i++) {
      if (ship.horizontal) {
        if (x + i > 7 || grid[x + i][y].shipHere) {
          return false;
        }
      } else {
        if (y + i > 7 || grid[x][y + i].shipHere) {
          return false;
        }
      }
    }
    return true;
  }
}

export { setPlayerBoard };

/*
function setShip() {}

function selectableSquares() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.classList.add("clickable");
    square.addEventListener("mouseover", () => {
      hoverAnimation(squares, square);
    });
  });
  function hoverAnimation(squares, square) {
    if (getShipDetails()) {
      let details = getShipDetails();
      let x = parseInt(square.dataset.x);
      let y = parseInt(square.dataset.y);

      if (validSquareHover(x, y, details.length, details.horizontal)) {
        clearSquares(squares);
        let adjacentSquares;
        let secondAxis;
        if (details.horizontal == "true") {
          adjacentSquares = document.querySelectorAll(`[data-y='${y}']`);
          secondAxis = parseInt(square.dataset.x);
        } else {
          adjacentSquares = document.querySelectorAll(`[data-x='${x}']`);
          secondAxis = parseInt(square.dataset.y);
        }
        for (let i = 0; i < details.length; i++) {
          adjacentSquares[secondAxis + i].classList.add("selected-square");
        }
      }
    }
  }
  function clearSquares(squares) {
    squares.forEach((square) => {
      square.classList.remove("selected-square");
    });
  }

  function validSquareHover(x, y, length, horizontal) {
    if (horizontal == "true") {
      if (x + length > 8) {
        console.log("x: " + typeof x + "length: " + typeof length);
        return false;
      }
    } else {
      if (y + length > 8) {
        console.log("vertical failed");
        return false;
      }
    }
    return true;
  }
}

function getShipDetails() {
  let selected = document.querySelector(".selected");
  if (selected) {
    return {
      length: parseInt(selected.dataset.length),
      horizontal: selected.dataset.horizontal,
    };
  } else {
    return null;
  }
}

//appendBoard(1, "Enemy");
function createBattlePage() {
  appendBoard(0, name);
  appendBoard(1, "Enemy");
}

function initPlacementListeners() {
  rotateBtnListen();
  shipWindowListen();
}

function shipWindowListen() {
  let ships = document.querySelectorAll(".ship");
  ships.forEach((ship) => {
    ship.addEventListener("click", () => {
      ships.forEach((ship) => {
        ship.classList.remove("selected");
      });
      ship.classList.add("selected");
    });
  });
}
function rotateBtnListen() {
  document.querySelector(".rotate-ships-btn").addEventListener("click", () => {
    let ships = document.querySelectorAll(".ship");
    ships.forEach((ship) => {
      if (ship.dataset.horizontal == "true") {
        ship.dataset.horizontal = "false";
      } else {
        ship.dataset.horizontal = "true";
      }
      let height = parseInt(ship.style.height.replace("px", ""));
      let width = parseInt(ship.style.width.replace("px", ""));
      if (height > width) {
        ship.style.width = ship.style.height;
        ship.style.height = "60px";
      } else {
        ship.style.height = ship.style.width;
        ship.style.width = "60px";
      }
    });
  });
}
*/
