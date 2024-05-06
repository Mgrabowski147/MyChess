import { Square } from './square.model';

export class Board {
  public squares: Square[][];

  constructor() {
    this.squares = [];
  }

  public getSquare(row: number, column: number) {
    if (row >= this.squares.length || column >= this.squares[row].length) {
      throw `out of board bounds: row ${row} column ${column}`;
    }

    return this.squares[row][column];
  }
}
