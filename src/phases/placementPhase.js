import { createGameboard } from "../objects/gameboard";
import { makeShipWindow, makeSettingBoard } from "../DOM/placeShipDOM";
import { setPlayerBoard } from "../index";

function placementPhase() {
  return new Promise((resolve, reject) => {
    let tempBoard = createGameboard();
    let selectedShipIndex = 0;
    tempBoard.setShipLocation(5, 3, 3);
    makeWindow();

    function makeWindow() {
      document.querySelector("body").innerHTML = "";
      makeShipWindow(tempBoard.ships, selectedShipIndex);
      makeSettingBoard(tempBoard.grid);
      rotateBtnListen();
      selectShipListen();
      placeShipListen();
    }

    function selectShipListen() {
      let ships = document.querySelectorAll(".ship");
      ships.forEach((ship) =>
        ship.addEventListener("click", () => {
          selectedShipIndex = parseInt(ship.dataset.index);
          makeWindow();
        })
      );
    }

    function placeShipListen() {
      let squares = document.querySelectorAll(".square");
      squares.forEach((square) => {
        square.addEventListener("click", () => {
          let x = parseInt(square.dataset.x);
          let y = parseInt(square.dataset.y);
          if (
            checkObstruction(
              x,
              y,
              tempBoard.ships[selectedShipIndex],
              tempBoard.grid
            )
          ) {
            tempBoard.setShipLocation(tempBoard.ships[selectedShipIndex], x, y);
            tempBoard.ships[selectedShipIndex].placeShip(x, y);
            tempBoard.ships[selectedShipIndex].placed = true;
            // checking if all ships placed
            for (let i = 0; i < tempBoard.ships.length; i++) {
              if (tempBoard.ships[i].placed == false) {
                selectedShipIndex = i;
                makeWindow();
                return;
              }
            } //load battle phase
            setPlayerBoard(tempBoard);
            resolve();
          }
        });
      });

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

    function rotateBtnListen() {
      document
        .querySelector(".rotate-ships-btn")
        .addEventListener("click", () => {
          if (tempBoard.ships[selectedShipIndex].horizontal) {
            tempBoard.ships[selectedShipIndex].horizontal = false;
          } else {
            tempBoard.ships[selectedShipIndex].horizontal = true;
          }
          makeWindow();
        });
    }
  });
}

export { placementPhase };
