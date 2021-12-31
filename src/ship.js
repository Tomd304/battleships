const createShip = (len) => {
  let length = len;
  let sunk = false;
  let horizontal = false;
  let location = [];

  function markHit(x, y) {
    location.forEach((block) => {
      if (block.x == x && block.y == y) {
        block.blockHit = true;
      }
    });
  }
  function allHit() {
    location.forEach((block) => {
      if (block.blockHit == false) {
        return false;
      }
      return true;
    });
  }

  function placeShip(x, y, horizontal) {
    for (let i = 0; i < length; i++) {
      if (horizontal) {
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
  };
};

export { createShip };
