import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { MoveFactory } from './MoveFactory';
import { MovesHelper } from './moves.helper';
import { PieceType } from '../../enums/piece-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RookMovesService implements IPieceMovesStrategy {
  constructor() {}

  getSpecialMoves(): Move[] {
    return [];
  }

  public getBasicMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const row = square.coordinates.row;
    const column = square.coordinates.column;

    for (let i = row + 1; i < 8; i++) {
      const squareToCheck = board.squares[i][column];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Rook,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    for (let i = row - 1; i >= 0; i--) {
      const squareToCheck = board.squares[i][column];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Rook,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    for (let i = column + 1; i < 8; i++) {
      const squareToCheck = board.squares[row][i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Rook,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    for (let i = column - 1; i >= 0; i--) {
      const squareToCheck = board.squares[row][i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Rook,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    return moves;
  }
}
