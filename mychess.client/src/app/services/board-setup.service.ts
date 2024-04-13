import { Injectable } from '@angular/core';
import { PieceColour } from '../enums/piece-colour.enum';
import { PieceType } from '../enums/piece-type.enum';
import { Board } from '../models/board.model';
import { Piece } from '../models/piece.model';
import { Square } from '../models/square.model';

@Injectable({
  providedIn: 'root',
})
export class BoardSetupService {
  constructor() {}

  public SetupNewBoard(): Board {
    const board: Board = { squares: [] };
    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const square = new Square(
          i,
          j,
          this.IsSquareBlack(i, j),
          this.GetInitialPieceForSquare(i, j),
          false,
        );
        row.push(square);
      }
      board.squares.push(row);
    }

    return board;
  }

  private IsSquareBlack(row: number, column: number): boolean {
    return ((row % 2) + (column % 2)) % 2 === 0;
  }

  private GetInitialPieceForSquare(
    row: number,
    column: number,
  ): Piece | undefined {
    if (!this.shouldSquareHavePiece(row)) {
      return undefined;
    }

    return {
      colour: this.GetPieceColour(row)!,
      type: this.GetPieceType(row, column)!,
    };
  }

  private shouldSquareHavePiece(row: number): boolean {
    return [0, 1, 6, 7].includes(row);
  }

  private GetPieceColour(row: number): PieceColour | undefined {
    if (row === 0 || row === 1) {
      return PieceColour.White;
    }
    if (row === 6 || row === 7) {
      return PieceColour.Black;
    }

    return undefined;
  }

  private GetPieceType(row: number, column: number): PieceType | undefined {
    if (this.IsPawnsRow(row)) {
      return PieceType.Pawn;
    }
    if (this.IsMajorPiecesRow(row)) {
      return this.GetMajorPieceByColumn(column);
    }

    return undefined;
  }

  private IsMajorPiecesRow(row: number): boolean {
    return row === 0 || row === 7;
  }

  private IsPawnsRow(row: number): boolean {
    return row === 1 || row === 6;
  }

  private GetMajorPieceByColumn(column: number): PieceType | undefined {
    if (column === 0 || column === 7) {
      return PieceType.Rook;
    }
    if (column === 1 || column === 6) {
      return PieceType.Knight;
    }
    if (column === 2 || column === 5) {
      return PieceType.Bishop;
    }
    if (column === 3) {
      return PieceType.Queen;
    }
    if (column === 4) {
      return PieceType.King;
    }

    return undefined;
  }
}
