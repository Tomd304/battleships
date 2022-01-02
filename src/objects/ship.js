const createShip = (len, shipIndex) => {
  let length = len;
  let sunk = false;
  let horizontal = false;
  let index = shipIndex;
  let location = [];
  let placed = false;

  function markHit(x, y) {
    location.forEach((block) => {
      if (block.x == x && block.y == y) {
        block.blockHit = true;
      }
    });
  }
  function allHit() {
    let allhit = true;
    location.forEach((block) => {
      if (block.blockHit == false) {
        allhit = false;
      }
    });
    return allhit;
  }

  function placeShip(x, y) {
    for (let i = 0; i < length; i++) {
      if (this.horizontal) {
        location.push({ x: x + i, y, blockHit: false });
      } else {
        location.push({ x, y: y + i, blockHit: false });
      }
    }
  }

  function sinkSelf() {
    this.sunk = true;
  }

  return {
    length,
    sunk,
    markHit,
    allHit,
    placeShip,
    location,
    sinkSelf,
    horizontal,
    index,
    placed,
  };
};

export { createShip };
