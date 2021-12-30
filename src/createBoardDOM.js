function createNameHeader(name) {
  let header = document.createElement("h2");
  header.classList.add("name-title");
  header.textContent = name;
  return header;
}

function appendBoard(p, name) {
  let container = document.createElement("div");
  container.classList.add("board-container");

  let header = createNameHeader(name);
  let grid = createGrid(p);
  container.append(header, grid);
  document.querySelector("body").appendChild(container);
}

function createGrid(p) {
  let grid = document.createElement("div");
  grid.classList.add("grid");

  grid.dataset.player = p;
  if (p == 1) {
    grid.classList.add("enemy-grid");
  }
  grid.id = "grid" + p;

  for (let i = 0; i < gridSize; i++) {
    grid.appendChild(createRow(i));
  }
  return grid;
}

function createRow(y) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < gridSize; i++) {
    row.appendChild(createSquare(i, y));
  }
  return row;
}

function createSquare(x, y) {
  let square = document.createElement("div");
  square.classList.add("square");
  square.dataset.x = x;
  square.dataset.y = y;
  return square;
}

let gridSize = 8;

export { appendBoard };
