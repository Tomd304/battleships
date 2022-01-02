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
    if (nameStorage) {
    } else {
    }

    player1 = await getPlayer1(nameStorage);
    player2 = createPlayer("Computer");
    await placementPhase();
    setComputerBoard();
    player1.setEnemyBoard(player2.board);
    player2.setEnemyBoard(player1.board);
    let winner = await battlePhase(player1, player2);
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
