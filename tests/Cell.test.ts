import Cell from '../src/Cell';

describe('Cell', () => {
    it('wont be alive if it dies', () => {
        const aliveCell = new Cell(true);
        const deadCell = aliveCell.die();

    expect(deadCell.isAlive()).toBe(false);
    });

    it('wont be dead if it lives', () => {
        const deadCell = new Cell(false);
        const aliveCell = deadCell.live();

    expect(aliveCell.isAlive()).toBe(true);
    });
})
