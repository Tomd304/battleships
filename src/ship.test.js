import { createShip } from "./ship";

it("ship creation", () =>
  expect(createShip(5)).toMatchObject({
    length: 5,
    blockHit: [false, false, false, false, false],
    sunk: false,
  }));

it("hit ship", () => {
  let ship = createShip(5);
  ship.markHit(3);
  expect(ship.blockHit[3]).toBe(true);
});

it("sink ship", () => {
  let ship = createShip(5);
  ship.sinkSelf();
  expect(ship.sunk).toBe(true);
});
