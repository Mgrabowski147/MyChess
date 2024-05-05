import { Injectable } from '@angular/core';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { Board } from '../../models/board.model';
import { MoveFactory } from './MoveFactory';
import { MovesHelper } from './moves.helper';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { PieceType } from '../../enums/piece-type.enum';

@Injectable({
  providedIn: 'root',
})
export class BishopMovesStrategyService implements IPieceMovesStrategy {
  constructor() {}

  getSpecialMoves(): Move[] {
    return [];
  }

  public getBasicMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const row = square.coordinates.row;
    const column = square.coordinates.column;

    // Diagonal movement towards top right
    for (let i = 1; row + i < 8 && column + i < 8; i++) {
      const squareToCheck = board.squares[row + i][column + i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Bishop,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    // Diagonal movement towards top left
    for (let i = 1; row + i < 8 && column - i >= 0; i++) {
      const squareToCheck = board.squares[row + i][column - i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Bishop,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    // Diagonal movement towards bottom right
    for (let i = 1; row - i >= 0 && column + i < 8; i++) {
      const squareToCheck = board.squares[row - i][column + i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Bishop,
          ),
        );
      }

      if (!MovesHelper.canPassSquare(squareToCheck)) {
        break;
      }
    }

    // Diagonal movement towards bottom left
    for (let i = 1; row - i >= 0 && column - i >= 0; i++) {
      const squareToCheck = board.squares[row - i][column - i];
      if (MovesHelper.canMoveToSquare(square, squareToCheck)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            squareToCheck,
            PieceType.Bishop,
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
