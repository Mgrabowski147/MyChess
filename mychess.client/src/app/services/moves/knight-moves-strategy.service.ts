import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { MoveFactory } from './MoveFactory';
import { Square } from '../../models/square.model';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { MovesHelper } from './moves.helper';

@Injectable({
  providedIn: 'root',
})
export class KnightMovesService implements IPieceMovesStrategy {
  constructor() {}

  public getMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const row = square.coordinates.row;
    const column = square.coordinates.column;

    // Define all possible knight moves relative to its current position
    const knightMoves: [number, number][] = [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
    ];

    // Check each possible move
    for (const [rowOffset, colOffset] of knightMoves) {
      const newRow = row + rowOffset;
      const newColumn = column + colOffset;
      if (
        this.isValidSquare(newRow, newColumn) &&
        MovesHelper.canMoveToSquare(square, board.squares[newRow][newColumn])
      ) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            board.squares[newRow][newColumn],
          ),
        );
      }
    }

    return moves;
  }

  private isValidSquare(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }
}
