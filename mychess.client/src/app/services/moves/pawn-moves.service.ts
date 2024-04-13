import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { PieceColour } from '../../enums/piece-colour.enum';
import { MoveFactory } from './MoveFactory';

@Injectable({
  providedIn: 'root',
})
export class PawnMovesService implements IPieceMovesStrategy {
  constructor() {}

  public getMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const piece = square.piece();

    if (!piece) return moves;

    const direction = piece.colour === PieceColour.White ? 1 : -1;

    this.addForwardMoves(square, direction, board, moves);

    this.addDiagonalMoves(square, direction, board, moves);

    return moves;
  }

  private addDiagonalMoves(
    square: Square,
    direction: number,
    board: Board,
    moves: Move[],
  ) {
    const row = square.coordinates.row;
    const column = square.coordinates.column;
    const piece = square.piece();

    if (!piece) return;

    for (const columnOffset of [-1, 1]) {
      const diagonalRow = row + direction;
      const diagonalColumn = column + columnOffset;
      if (this.isValidSquare(diagonalRow, diagonalColumn)) {
        const targetSquare = board.squares[diagonalRow][diagonalColumn];
        if (
          targetSquare.piece() &&
          targetSquare.piece()?.colour !== piece.colour
        ) {
          moves.push(MoveFactory.createMoveWithSquares(square, targetSquare));
        }
      }
    }
  }

  private addForwardMoves(
    square: Square,
    direction: number,
    board: Board,
    moves: Move[],
  ) {
    const row = square.coordinates.row;
    const column = square.coordinates.column;

    const forwardRow = row + direction;
    if (
      this.isValidSquare(forwardRow, column) &&
      !board.squares[forwardRow][column].piece()
    ) {
      moves.push(
        MoveFactory.createMoveWithSquares(
          square,
          board.squares[forwardRow][column],
        ),
      );

      const doubleForwardRow = row + 2 * direction;
      if (this.canMoveTwoSquares(square, board)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            board.squares[doubleForwardRow][column],
          ),
        );
      }
    }
  }

  private isValidSquare(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  private canMoveTwoSquares(square: Square, board: Board): boolean {
    if (square.piece()?.colour === PieceColour.White) {
      if (square.coordinates.row !== 1) {
        return false;
      }

      if (
        board.squares[square.coordinates.row + 1][
          square.coordinates.column
        ].piece() ||
        board.squares[square.coordinates.row + 2][
          square.coordinates.column
        ].piece()
      ) {
        return false;
      }

      return true;
    } else {
      if (square.coordinates.row !== 6) {
        return false;
      }

      if (
        board.squares[square.coordinates.row - 1][
          square.coordinates.column
        ].piece() ||
        board.squares[square.coordinates.row - 2][
          square.coordinates.column
        ].piece()
      ) {
        return false;
      }

      return true;
    }
  }
}
