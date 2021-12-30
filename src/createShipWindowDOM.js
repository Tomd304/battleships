function createShipWindow() {
  let container = document.createElement("div");
  container.classList.add("ship-container");
  return container;
}

function createShips(quantity, length) {
  let ships = [];
  for (let i = 0; i < quantity; i++) {
    ships.push(createShip(length));
  }
  return ships;
}

function createShip(length) {
  let ship = document.createElement("div");
  ship.classList.add("ship-" + length, "ship", "clickable");
  ship.style.height = length * 60 + "px";
  ship.style.width = "60px";
  ship.dataset.length = length;
  ship.dataset.horizontal = false;
  return ship;
}

function addRotateBtn() {
  let rotateBtn = document.createElement("button");
  rotateBtn.classList.add("rotate-ships-btn");
  rotateBtn.textContent = "Rotate Ships";
  return rotateBtn;
}

function createAll() {
  let shipWindow = createShipWindow();
  shipWindow.append(
    addRotateBtn(),
    ...createShips(4, 2),
    ...createShips(3, 3),
    ...createShips(2, 4),
    ...createShips(1, 5)
  );
  document.querySelector("body").appendChild(shipWindow);
}

export { createAll };
