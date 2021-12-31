function makeShipWindow(shipArray, selectedShipIndex) {
  let shipWindow = createShipWindow();
  shipWindow.append(addRotateBtn());
  for (let i = 0; i < shipArray.length; i++) {
    let ship = createShip(shipArray[i].length, shipArray[i].horizontal);
    ship.dataset.index = i;
    if (selectedShipIndex == i) {
      ship.classList.add("selected");
    }
    shipWindow.appendChild(ship);
  }
  document.querySelector("body").appendChild(shipWindow);
}

function createShipWindow() {
  let container = document.createElement("div");
  container.classList.add("ship-container");
  return container;
}

function createShip(length, horizontal) {
  let ship = document.createElement("div");
  ship.classList.add("ship", "clickable");
  if (horizontal) {
    ship.style.height = "60px";
    ship.style.width = length * 60 + "px";
  } else {
    ship.style.height = length * 60 + "px";
    ship.style.width = "60px";
  }
  return ship;
}

function addRotateBtn() {
  let rotateBtn = document.createElement("button");
  rotateBtn.classList.add("rotate-ships-btn");
  rotateBtn.textContent = "Rotate Ships";
  return rotateBtn;
}

function createGrid(gridArr) {
  let grid = document.createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < 8; i++) {
    grid.appendChild(createRow(i, gridArr));
  }
  return grid;
}

function createRow(y, gridArr) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < 8; i++) {
    row.appendChild(createSquare(i, y, gridArr));
  }
  return row;
}

function createSquare(x, y, gridArr) {
  let square = document.createElement("div");
  square.classList.add("square");
  if (gridArr[x][y].shipHere) {
    square.style.backgroundColor = "black";
  } else {
    square.style.cursor = "pointer";
  }
  square.dataset.x = x;
  square.dataset.y = y;
  return square;
}

function createNameHeader(name) {
  let header = document.createElement("h2");
  header.classList.add("name-title");
  header.textContent = name;
  return header;
}

function makeSettingBoard(gridArr) {
  let container = document.createElement("div");
  container.classList.add("board-container");
  let header = createNameHeader("Set Your Board");
  let grid = createGrid(gridArr);
  container.append(header, grid);
  document.querySelector("body").appendChild(container);
}

export { makeShipWindow, makeSettingBoard };
