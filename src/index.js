import "./styles.css";
import { createPlayer } from "./player";
import { appendBoard, createSetterBoard } from "./createBoardDOM";
import { makeShipWindow, makeSettingBoard } from "./placeShipDOM";
import { createGameboard } from "./gameboard";
import { startShipPlacement } from "./shipPlacementPhase";

let name = "Player 1";

let player1 = createPlayer(name);
let player2 = createPlayer("computer");
player1.setEnemyBoard(player2.board);
player2.setEnemyBoard(player1.board);

function setPlayerBoard(tempBoard) {
  player1.board = tempBoard;
  console.table(player1.board.grid);
  console.table(player1.board.ships);
}
function playGame() {
  let gameover = false;
  while (true) {
    playerTurn(player1);
    if (player1.winner == true) {
      gameover = true;
    }
    if (gameover == false) {
      playerTurn(player2);
      if (player2.winner == true) {
        gameover = true;
      }
    }
  }
}

function playerTurn(player) {
  let attackSuccess = false;
  while ((attackSuccess = false)) {
    if (player.attackEnemy(x, y)) {
      attackSuccess = true;
    }
    if (player.enemyBoard.gameOver()) {
      player.winner = true;
    }
  }
}

document.querySelector("#start-game-btn").addEventListener("click", () => {
  let nameInput = document.querySelector("#player-name-input").value;
  if (nameInput) {
    name = nameInput;
  }
  document.querySelector("body").innerHTML = "";
  startShipPlacement();
  //appendBoard(1, "Enemy");
});

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
