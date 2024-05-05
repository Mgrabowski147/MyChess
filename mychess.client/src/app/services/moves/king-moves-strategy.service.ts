import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { MovesHelper } from './moves.helper';
import { MoveFactory } from './MoveFactory';
import { PieceType } from '../../enums/piece-type.enum';

@Injectable({
  providedIn: 'root',
})
export class KingMovesStrategyService implements IPieceMovesStrategy {
  constructor() {}

  getSpecialMoves(/*square: Square, board: Board, game: Game*/): Move[] {
    throw new Error('Method not implemented.');
  }

  public getBasicMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const row = square.coordinates.row;
    const column = square.coordinates.column;

    // Check all adjacent squares
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newColumn = column + j;
        if (
          this.isValidSquare(newRow, newColumn) &&
          MovesHelper.canMoveToSquare(square, board.squares[newRow][newColumn])
        ) {
          moves.push(
            MoveFactory.createMoveWithSquares(
              square,
              board.squares[newRow][newColumn],
              PieceType.King,
            ),
          );
        }
      }
    }

    // Castling
    // TODO: Implement castling logic here

    return moves;
  }

  private isValidSquare(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }
}
