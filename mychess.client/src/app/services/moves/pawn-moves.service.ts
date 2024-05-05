import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { PlayerColour } from '../../enums/piece-colour.enum';
import { MoveFactory } from './MoveFactory';
import { Game } from '../../models/game.model';
import { PieceType } from '../../enums/piece-type.enum';
import { MoveBuilder } from './move-builder';
import { MoveSpecialEffect } from '../../models/move-special-effect.model';
import { MoveSpecialEffectType } from '../../enums/move-special-effect-type.enum';

@Injectable({
  providedIn: 'root',
})
export class PawnMovesService implements IPieceMovesStrategy {
  public getBasicMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];
    const piece = square.piece();

    if (!piece) return moves;

    const direction = piece.colour === PlayerColour.White ? 1 : -1;

    this.addForwardMoves(square, direction, board, moves);

    this.addDiagonalMoves(square, direction, board, moves);

    return moves;
  }

  getSpecialMoves(square: Square, board: Board, game: Game): Move[] {
    const piece = square.piece();

    if (!piece || game.moves?.length === 0) return [];

    if (!this.isOnAdequateRowToEnPassant(square)) return [];

    const lastMove = game.moves[game.moves.length - 1];
    if (lastMove.pieceType !== PieceType.Pawn) return [];

    if (!this.wasLastMoveOnAdjacentColumn(lastMove, square)) return [];

    if (!this.isLastMoveTwoRowsMove(lastMove)) return [];

    return this.holyHell(square, lastMove);
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
          moves.push(
            MoveFactory.createMoveWithSquares(
              square,
              targetSquare,
              PieceType.Pawn,
            ),
          );
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
          PieceType.Pawn,
        ),
      );

      const doubleForwardRow = row + 2 * direction;
      if (this.canMoveTwoSquares(square, board)) {
        moves.push(
          MoveFactory.createMoveWithSquares(
            square,
            board.squares[doubleForwardRow][column],
            PieceType.Pawn,
          ),
        );
      }
    }
  }

  private isValidSquare(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  private canMoveTwoSquares(square: Square, board: Board): boolean {
    if (square.piece()?.colour === PlayerColour.White) {
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

  private isOnAdequateRowToEnPassant(square: Square) {
    if (square.piece()?.colour === PlayerColour.White) {
      return square.coordinates.row === 4;
    }

    return square.coordinates.row === 3;
  }

  private wasLastMoveOnAdjacentColumn(lastMove: Move, square: Square) {
    return Math.abs(lastMove.from.column - square.coordinates.column) === 1;
  }

  private isLastMoveTwoRowsMove(lastMove: Move) {
    return Math.abs(lastMove.from.row - lastMove.to.row) === 2;
  }

  private holyHell(square: Square, lastMove: Move): Move[] {
    const moveBuilder = new MoveBuilder();

    const specialEffect: MoveSpecialEffect = {
      specialEffectType: MoveSpecialEffectType.RemovePiece,
      squareToAffect: lastMove.to,
    };

    moveBuilder
      .fromSquare(square)
      .withPiece(PieceType.Pawn)
      .withSpecialEffect(specialEffect);

    if (square.piece()?.colour === PlayerColour.White) {
      moveBuilder.toCoords({ column: lastMove.to.column, row: 5 });
    } else {
      moveBuilder.toCoords({ column: lastMove.to.column, row: 2 });
    }

    return [moveBuilder.build()];
  }
}
