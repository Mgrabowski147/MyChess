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
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const square = new Square(
          i,
          j,
          this.IsSquareBlack(i, j),
          this.GetInitialPieceForSquare(i, j),
          false,
        );
        board.squares.push(square);
      }
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
    return [1, 2, 7, 8].includes(row);
  }

  private GetPieceColour(row: number): PieceColour | undefined {
    if (row === 1 || row === 2) {
      return PieceColour.White;
    }
    if (row === 7 || row === 8) {
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
    return row === 1 || row === 8;
  }

  private IsPawnsRow(row: number): boolean {
    return row === 2 || row === 7;
  }

  private GetMajorPieceByColumn(column: number): PieceType | undefined {
    if (column === 1 || column === 8) {
      return PieceType.Rook;
    }
    if (column === 2 || column === 7) {
      return PieceType.Knight;
    }
    if (column === 3 || column === 6) {
      return PieceType.Bishop;
    }
    if (column === 4) {
      return PieceType.Queen;
    }
    if (column === 5) {
      return PieceType.King;
    }

    return undefined;
  }
}
