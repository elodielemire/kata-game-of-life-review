import Cell from './Cell';

class CellsLengthNotMultipleOfColumnsCount extends RangeError {}

class World {
    private cells: Cell[];
    private columns: number;

    static CellsLengthNotMultipleOfColumnsCount = CellsLengthNotMultipleOfColumnsCount;

    constructor(columns: number, cells: Cell[]) {
        this.cells = cells;
        this.columns = columns;

        if (cells.length % columns !== 0) {
            const msg = `You provided ${this.cells.length} cells but it has to be a multiple of ${this.columns}`;
            throw new World.CellsLengthNotMultipleOfColumnsCount(msg);
        }
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

    getNeighbors(cellIndex: number) {
        const cellToTest: Cell = this.cells[cellIndex];

        const cellTop = this.cells[cellIndex - this.columns];
        const cellBottom = this.cells[cellIndex + this.columns];

        const cellLeft = (cellIndex % this.columns !== 0) && this.cells[cellIndex - 1];
        const cellRight = (cellIndex % this.columns !== this.columns - 1) && this.cells[cellIndex + 1];

        const cellTopLeft = (cellTop && cellLeft) && this.cells[cellIndex - this.columns - 1];
        const cellTopRight = (cellTop && cellRight) && this.cells[cellIndex - this.columns + 1];

        const cellBottomLeft = (cellBottom && cellLeft) && this.cells[cellIndex + this.columns - 1];
        const cellBottomRight = (cellBottom && cellRight) && this.cells[cellIndex + this.columns + 1];

        return [
            cellTop,
            cellBottom,
            cellLeft,
            cellRight,
            cellTopLeft,
            cellTopRight,
            cellBottomLeft,
            cellBottomRight
        ].filter(Boolean);
    }

    getAliveNeighbors(cellIndex: number) {
        return this.getNeighbors(cellIndex).filter(
            cell => cell instanceof Cell && cell.isAlive()
        );
    }

    next(): void {
        this.cells = this.cells.map((cell, index) => {
            switch (this.getAliveNeighbors(index).length) {
                case 3:
                    return cell.live();
                case 2:
                    return cell;
                default:
                    return cell.die();
            }
        })
    }
}

export default World;
