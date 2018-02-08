import World from "../src/World";
import Cell from "../src/Cell";

describe("World", () => {
    it("will create a 8x8 world with 64 cells", () => {
        const world = World.buildRandom(8, 8);

        expect(world.getSize()).toBe(64);
    });

    it("will create a 2x2 world of chosen cells", () => {
        const cell1 = new Cell(true);
        const cell2 = new Cell(false);
        const cell3 = new Cell(true);
        const cell4 = new Cell(false);
        const world = new World(2, [cell1, cell2, cell3, cell4]);

        expect(world.getGrid()).toEqual([[cell1, cell2],[cell3, cell4]]);
    })
});
