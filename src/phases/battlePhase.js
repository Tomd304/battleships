import { makeBattleWindow } from "../DOM/battlePhaseDOM";

function battlePhase(player1, player2) {
  let gameOver = false;
  return new Promise(async (resolve, reject) => {
    while (gameOver == false) {
      makeBattleWindow(player1, player2);
      await addAttackListeners();
      makeBattleWindow(player1, player2);
      await new Promise((resolve) => setTimeout(resolve, 250));
      if (player1.board.gameLost()) {
        gameOver = true;
        resolve(player2);
      }
      randomEnemyAttack();
      if (player2.board.gameLost()) {
        resolve(player1);
        gameOver = true;
      }
    }
  });

  function takeTurn(player, x, y) {
    player.enemyBoard.receiveAttack(x, y);
  }

  function addAttackListeners() {
    return new Promise((resolve, reject) => {
      let squares = document.querySelectorAll(".enemy-square");
      squares.forEach(
        (square) => {
          square.addEventListener("click", () => {
            let x = parseInt(square.dataset.x);
            let y = parseInt(square.dataset.y);
            takeTurn(player1, x, y);
            resolve();
          });
        },
        { once: true }
      );
    });
  }

  function randomEnemyAttack() {
    let set = false;
    let x, y;
    while (set == false) {
      x = Math.floor(Math.random() * 8);
      y = Math.floor(Math.random() * 8);
      if (player1.board.grid[x][y].attacked == false) {
        player1.board.receiveAttack(x, y);
        set = true;
      }
    }
  }
}

export { battlePhase };
