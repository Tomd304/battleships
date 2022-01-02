import { makeWinnerWindow } from "../DOM/winnerPhaseDOM";

async function winnerPhase(player1, player2) {
  makeWinnerWindow(player1, player2);
  return new Promise(async (resolve, reject) => {
    await addReplayListener();
    resolve();
  });

  function addReplayListener() {
    return new Promise(async (resolve, reject) => {
      let replayBtn = document.querySelector(".replay-btn");
      replayBtn.addEventListener("click", () => {
        clearPlayers();
        resolve();
      });
    });
    function clearPlayers() {
      for (const key in player1) {
        delete player1[key];
      }
      for (const key in player2) {
        delete player2[key];
      }
    }
  }
}

export { winnerPhase };
