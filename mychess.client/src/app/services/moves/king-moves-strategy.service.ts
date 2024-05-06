import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { MovesHelper } from './moves.helper';
import { MoveFactory } from './MoveFactory';
import { PieceType } from '../../enums/piece-type.enum';
import { Game } from '../../models/game.model';
import { Piece } from '../../models/piece.model';
import { PlayerColour } from '../../enums/piece-colour.enum';
import { MoveBuilder } from './move-builder';
import { MoveSpecialEffect } from '../../models/move-special-effect.model';
import { MoveSpecialEffectType } from '../../enums/move-special-effect-type.enum';

@Injectable({
  providedIn: 'root',
})
export class KingMovesStrategyService implements IPieceMovesStrategy {
  constructor() {}

  getSpecialMoves(square: Square, board: Board, game: Game): Move[] {
    const piece = square.piece();
    const moves: Move[] = [];

    if (!piece) return [];

    if (this.canCastleShort(piece, game, board)) {
      const move = this.getCastleShortMove(square);
      moves.push(move);
    }

    if (this.canCastleLong(piece, game, board)) {
      const move = this.getCastleLongMove(square);
      moves.push(move);
    }

    return moves;
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

    return moves;
  }

  private isValidSquare(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  private canCastleShort(piece: Piece, game: Game, board: Board): boolean {
    let row = 0;
    if (piece.colour === PlayerColour.Black) {
      row = 7;
    }

    const rookStartingColumn = 7;
    const kingStartingColumn = 4;

    if (this.wasPieceMovedOrTaken(row, rookStartingColumn, game)) {
      return false;
    }

    if (this.wasPieceMovedOrTaken(row, kingStartingColumn, game)) {
      return false;
    }

    if (
      this.isAnyPieceBetweenKingAndRook(
        row,
        rookStartingColumn,
        kingStartingColumn,
        board,
      )
    ) {
      return false;
    }

    // add check checks

    return true;
  }

  private canCastleLong(piece: Piece, game: Game, board: Board): boolean {
    let row = 0;
    if (piece.colour === PlayerColour.Black) {
      row = 7;
    }

    const rookStartingColumn = 0;
    const kingStartingColumn = 4;

    if (this.wasPieceMovedOrTaken(row, rookStartingColumn, game)) {
      return false;
    }

    if (this.wasPieceMovedOrTaken(row, kingStartingColumn, game)) {
      return false;
    }

    if (
      this.isAnyPieceBetweenKingAndRook(
        row,
        rookStartingColumn,
        kingStartingColumn,
        board,
      )
    ) {
      return false;
    }

    // add check checks

    return true;
  }

  private getCastleShortMove(square: Square) {
    const specialEffect: MoveSpecialEffect = {
      specialEffectType: MoveSpecialEffectType.MovePiece,
      squareToAffect: { row: square.coordinates.row, column: 7 },
      destinationSquare: { row: square.coordinates.row, column: 5 },
    };
    const moveBuilder = new MoveBuilder();
    const move = moveBuilder
      .fromSquare(square)
      .toCoords({ row: square.coordinates.row, column: 6 })
      .withPiece(PieceType.King)
      .withSpecialEffect(specialEffect)
      .build();
    return move;
  }

  private getCastleLongMove(square: Square) {
    const specialEffect: MoveSpecialEffect = {
      specialEffectType: MoveSpecialEffectType.MovePiece,
      squareToAffect: { row: square.coordinates.row, column: 0 },
      destinationSquare: { row: square.coordinates.row, column: 3 },
    };
    const moveBuilder = new MoveBuilder();
    const move = moveBuilder
      .fromSquare(square)
      .toCoords({ row: square.coordinates.row, column: 2 })
      .withPiece(PieceType.King)
      .withSpecialEffect(specialEffect)
      .build();
    return move;
  }

  private isAnyPieceBetweenKingAndRook(
    row: number,
    rookColumn: number,
    kingColumn: number,
    board: Board,
  ): boolean {
    const columnMin = Math.min(rookColumn, kingColumn);
    const columnMax = Math.max(rookColumn, kingColumn);

    for (let i = columnMin + 1; i < columnMax; i++) {
      if (board.getSquare(row, i).piece() != null) {
        return true;
      }
    }

    return false;
  }

  private wasPieceMovedOrTaken(
    row: number,
    column: number,
    game: Game,
  ): boolean {
    return game.moves.some((move) => {
      if (move.from.column === column && move.from.row === row) {
        return true;
      }

      if (move.to.column === column && move.to.row === row) {
        return true;
      }

      return false;
    });
  }
}
