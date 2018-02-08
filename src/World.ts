import Cell from './Cell';

class World {
    private cells: Cell[];
    private columns: number;

    constructor(colums: number, cells: Cell[]) {
        this.cells = cells;
        this.columns = colums;
    }

    static buildRandom(colums: number, lines: number): World {
        const cells = Array(colums * lines).fill(null).map(() => {
            const probability: number = 0.5;
            const willBeAlive: boolean = Math.random() > probability;

            return new Cell(willBeAlive);
        });

        return new World(colums, cells);
    }

    getSize(): number {
        return this.cells.length;
    }

    getGrid(): Cell[][] {
        return this.cells.reduce((acc: Cell[][], currCell: Cell, index: number) : Cell[][] => {
            if (index % this.columns === 0) {
                // create a new line
                return [...acc, [currCell]];
            }

            const lastLineIndex = acc.length - 1;
            const lastLine = acc[lastLineIndex];

            //push a new cell to the last line
            return [
                ...acc.slice(0, lastLineIndex),
                [...lastLine, currCell]
            ];

        }, []);
    }
}

export default World;
