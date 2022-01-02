function makeBattleWindow(player1, player2) {
  let body = document.querySelector("body");
  body.innerHTML = "";
  let container = document.createElement("div");
  container.classList.add("board-container");
  container.appendChild(createTitle(player1.playerName, player2.playerName));
  let gameContainer = document.createElement("div");
  gameContainer.style.display = "flex";
  gameContainer.style.gap = "60px";
  let leftSide = document.createElement("div");
  leftSide.append(
    createNameHeader(player1.playerName),
    createGrid(player1.board.grid)
  );
  let rightSide = document.createElement("div");
  rightSide.append(
    createNameHeader(player2.playerName),
    createGrid(player2.board.grid)
  );
  gameContainer.append(leftSide, rightSide);
  container.appendChild(gameContainer);
  body.appendChild(container);
}

function createTitle(name1, name2) {
  let title = document.createElement("h1");
  title.classList.add("name-title");
  title.textContent = name1 + " VS " + name2;
  title.style.textAlign = "center";
  return title;
}

function createNameHeader(name) {
  let header = document.createElement("h2");
  header.classList.add("name-title");
  header.textContent = name;
  return header;
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

export { makeBattleWindow };
