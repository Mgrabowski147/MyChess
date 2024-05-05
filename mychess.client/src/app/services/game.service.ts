import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Square } from '../models/square.model';
import { PossibleMovesService } from './moves/possible-moves.service';
import { Move } from '../models/move.model';
import { Game } from '../models/game.model';
import { MoveSpecialEffect } from '../models/move-special-effect.model';
import { MoveSpecialEffectType } from '../enums/move-special-effect-type.enum';

// Not meant to be singleton - should be provided at component level
@Injectable()
export class GameService {
  private board: Board;
  private selectedSquare?: Square;
  private game = new Game();

  constructor(private movesService: PossibleMovesService) {}

  public setBoard(board: Board) {
    this.board = board;
  }

  public actOnSquare(square: Square) {
    this.clearHighlights();

    if (this.selectedSquare) {
      if (this.canMakeMove(this.selectedSquare, square)) {
        this.makeMove(this.selectedSquare, square);
        this.selectedSquare = undefined;
        return;
      }
    }

    this.selectedSquare = square;
    const moves = this.movesService.GetPossibleMovesForSquare(
      square,
      this.board,
      this.game,
    );
    this.highlightPossibleMoves(moves);
  }

  private canMakeMove(squareFrom: Square, squareTo: Square) {
    const moves = this.movesService.GetPossibleMovesForSquare(
      squareFrom,
      this.board,
      this.game,
    );

    return moves.some(
      (move) =>
        move.to.column === squareTo.coordinates.column &&
        move.to.row === squareTo.coordinates.row,
    );
  }

  private clearHighlights() {
    this.board.squares.forEach((row) =>
      row.forEach((square) => {
        square.isHighlighted.set(false);
      }),
    );
  }

  private highlightPossibleMoves(moves: Move[]) {
    moves.forEach((move) => {
      this.board.squares[move.to.row][move.to.column].isHighlighted.set(true);
    });
  }

  private makeMove(from: Square, to: Square) {
    const moves = this.movesService.GetPossibleMovesForSquare(
      from,
      this.board,
      this.game,
    );

    const move = moves.find(
      (move) =>
        move.to.row === to.coordinates.row &&
        move.to.column === to.coordinates.column,
    );

    if (!move) {
      throw `move impossible: ` + move;
    }

    if (move.specialEffect) {
      this.executeMoveSpecialEffect(move.specialEffect);
    }

    this.game.moves.push(move);
    const pieceToMove =
      this.board.squares[move.from.row][move.from.column].piece();
    this.board.squares[move.from.row][move.from.column].piece.set(undefined);
    this.board.squares[move.to.row][move.to.column].piece.set(pieceToMove);
  }

  private executeMoveSpecialEffect(moveSpecialEffect: MoveSpecialEffect): void {
    if (
      moveSpecialEffect.specialEffectType === MoveSpecialEffectType.RemovePiece
    ) {
      this.board.squares[moveSpecialEffect.squareToAffect.row][
        moveSpecialEffect.squareToAffect.column
      ].piece.set(undefined);
    }
  }
}
