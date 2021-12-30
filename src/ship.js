const createShip = (len) => {
  let length = len;
  let blockHit = createHitArray(length);
  let sunk = false;

  function createHitArray() {
    let blockHit = [];
    for (let i = 0; i < length; i++) {
      blockHit.push(false);
    }
    return blockHit;
  }

  function markHit(index) {
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

  function sinkSelf() {
    this.sunk = true;
  }

  return { length, blockHit, sunk, markHit, allHit, sinkSelf };
};

export { createShip };
