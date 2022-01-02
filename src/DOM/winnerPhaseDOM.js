function makeWinnerWindow(player1, player2) {
  let body = document.querySelector("body");
  body.innerHTML = "";
  let container = document.createElement("div");
  container.classList.add("board-container");
  container.appendChild(createTitle(player1, player2));
  let gameContainer = document.createElement("div");
  gameContainer.style.display = "flex";
  gameContainer.style.gap = "60px";
  let leftSide = document.createElement("div");
  leftSide.append(
    createNameHeader(player1.playerName),
    createGrid(player1.board.grid, false, player1)
  );
  let rightSide = document.createElement("div");
  rightSide.append(
    createNameHeader(player2.playerName),
    createGrid(player2.board.grid, true, player2)
  );
  gameContainer.append(leftSide, rightSide);
  container.append(gameContainer, createPlayAgainBtn());
  body.appendChild(container);
}

function createTitle(player1, player2) {
  let title = document.createElement("h1");
  title.classList.add("name-title");
  if (player1.board.gameLost()) {
    title.textContent = player2.playerName + " WINS!";
  } else {
    title.textContent = player1.playerName + " WINS!";
  }
  title.style.textAlign = "center";
  return title;
}

function createNameHeader(name) {
  let header = document.createElement("h2");
  header.classList.add("name-title");
  header.textContent = name;
  return header;
}

function createGrid(gridArr, enemy, player) {
  let grid = document.createElement("div");
  grid.classList.add("grid");
  for (let i = 0; i < 8; i++) {
    grid.appendChild(createRow(i, gridArr, enemy, player));
  }
  return grid;
}

function createRow(y, gridArr, enemy, player) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let i = 0; i < 8; i++) {
    row.appendChild(createSquare(i, y, gridArr, enemy, player));
  }
  return row;
}

function createSquare(x, y, gridArr, enemy, player) {
  let colors = [
    "beige",
    "blue",
    "green",
    "turquoise",
    "brown",
    "pink",
    "silver",
    "gold",
    "orange",
    "teal",
  ];

  let square = document.createElement("div");
  square.classList.add("square");
  if (enemy) {
    if (gridArr[x][y].attacked) {
    } else {
      square.style.cursor = "pointer";
      square.classList.add("enemy-square");
    }
  } else {
    if (gridArr[x][y].shipHere) {
      square.style.backgroundColor = "black";
    }
  }
  if (gridArr[x][y].attacked) {
    let hitMarker = createHitMarker(x, y, gridArr[x][y].shipHere, player);
    square.appendChild(hitMarker);
  }
  if (
    gridArr[x][y].shipHere &&
    player.board.ships[player.board.grid[x][y].shipIndex].sunk
  ) {
    console.log("sunk");
    square.classList.add("sunk");
    square.style.backgroundColor = colors[player.board.grid[x][y].shipIndex];
  }

  square.dataset.x = x;
  square.dataset.y = y;
  return square;
}

function createHitMarker(x, y, shipHere, player) {
  let circle = document.createElement("div");
  circle.style.height = "30px";
  circle.style.width = "30px";
  circle.style.borderRadius = "50%";
  if (shipHere) {
    if (player.board.ships[player.board.grid[x][y].shipIndex].sunk) {
      circle.style.backgroundColor = "red";
      circle.style.border = "none";
    } else {
      circle.style.backgroundColor = "none";
      circle.style.border = "3px solid red";
    }
  } else {
    circle.style.border = "3px solid white";
    circle.style.backgroundColor = "none";
  }
  return circle;
}

function createPlayAgainBtn() {
  let replayBtn = document.createElement("button");
  replayBtn.classList.add("replay-btn");
  replayBtn.textContent = "Replay Game";
  return replayBtn;
}

export { makeWinnerWindow };