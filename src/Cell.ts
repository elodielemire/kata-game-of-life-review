class Cell {
  private alive: boolean;

  constructor(alive: boolean) {
    this.alive = alive;
  }

  isAlive(): boolean {
    return this.alive;
  }

  die(): Cell {
    return new Cell(false);
  }

  live(): Cell {
    return new Cell(true);
  }
}

export default Cell;
