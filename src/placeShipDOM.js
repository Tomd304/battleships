let targetGrid = document.querySelector(".grid");
console.log();

function placeShip(x, y, rotate = false) {
  let targetGrid = document.querySelector("#grid0");
  let ship = document.createElement("div");
  ship.classList.add("ship", "ship-3");
  if (rotate) {
    ship.style.left = 60 * (x - 1) + "px";
    ship.style.top = 60 * (y + 1) + "px";
    ship.style.transform = "rotate(90deg)";
  } else {
    ship.style.left = 60 * x + "px";
    ship.style.top = 60 * y + "px";
  }
  targetGrid.appendChild(ship);
}

export { placeShip };
