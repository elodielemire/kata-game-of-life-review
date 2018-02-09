import World from "../src/World";
import Cell from "../src/Cell";

describe("World", () => {
    it("will create a 8x8 world with 64 cells", () => {
        const world = World.buildRandom(8, 8);

        expect(world.getSize()).toBe(64);
    });

    it("will create a 2x2 world of chosen cells", () => {
        const cellAlive = new Cell(true);
        const cellDead = new Cell(false);
        const world = new World(2, [cellAlive, cellDead, cellAlive, cellDead]);

        expect(world.getGrid()).toEqual([[cellAlive, cellDead],[cellAlive, cellDead]]);
    });

    it("will create a 3x2 world of chosen cells", () => {
        const cellAlive = new Cell(true);
        const cellDead = new Cell(false);
        const world = new World(3, [cellAlive, cellDead, cellAlive, cellAlive, cellDead, cellAlive]);

        expect(world.getGrid()).toEqual([[cellAlive, cellDead, cellAlive], [cellAlive, cellDead, cellAlive]]);
    });

    it("will create two random worlds different from eachother", () => {
        const world1 = World.buildRandom(32, 32);
        const world2 = World.buildRandom(32, 32);

        expect(world1).not.toEqual(world2);
    });

    it("will throw an error if the number of cells is 3 and there are 2 columns", () => {
        const cellAlive = new Cell(true);
        const cellDead = new Cell(false);

        expect(
            () => new World(2, [cellAlive, cellDead, cellAlive])
        ).toThrowError(World.CellsLengthNotMultipleOfColumnsCount);
    });

    it("will return 3 neighbors for the cells in the corners of a 3x3 grid", () => {
        const world = World.buildRandom(3, 3);

        expect(world.getNeighbors(0).length).toBe(3);
        expect(world.getNeighbors(2).length).toBe(3);
        expect(world.getNeighbors(6).length).toBe(3);
        expect(world.getNeighbors(8).length).toBe(3);
    });

    it("will return 8 neighbors for the cell in the middle of a 3x3 grid", () => {
        const world = World.buildRandom(3, 3);

        expect(world.getNeighbors(4).length).toBe(8);
    });

    it("will return a new array of cells with the rules of the game", () => {
        const cellAlive = new Cell(true);
        const cellDead = new Cell(false);
        const world = new World(3, [cellAlive, cellDead, cellAlive, cellAlive, cellDead, cellAlive]);
        world.next();
        // 1 0 1
        // 1 0 1
        expect(world.getGrid()).toEqual([[cellDead, cellDead, cellDead], [cellDead, cellDead, cellDead]]);
    });
});
