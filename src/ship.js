const createShip = (len) => {
  let length = len;
  let blockHit = createHitArray(length);
  let sunk = false;
  let horizontal;
  let location = [];

  function createHitArray() {
    let blockHit = [];
    for (let i = 0; i < length; i++) {
      blockHit.push(false);
    }
    return blockHit;
  }

  function markHit(x, y) {
    location[
    this.blockHit[index] = true;
  }
  function allHit() {
    for (let i = 0; i < length; i++) {
      if ((blockHit[i] = false)) {
        return false;
      }
    }
    return true;
  }

  function setHorizontal() {
    horizontal = true;
  }

  function setVertical() {
    horizontal = false;
  }

  function placeShip(x, y, horizontal) {
    for (let i = 0; i < length; i++) {
      if (horizontal) {
        location.push({ x: x + i, y });
      } else {
        location.push({ x, y: y + i });
      }
    }
  }

  function sinkSelf() {
    this.sunk = true;
  }

  return {
    length,
    blockHit,
    sunk,
    markHit,
    allHit,
    setHorizontal,
    setVertical,
    placeShip,
    location,
    sinkSelf,
  };
};

export { createShip };
