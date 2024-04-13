import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Square } from '../models/square.model';
import { MoveFactory } from './moves/MoveFactory';
import { PossibleMovesService } from './moves/possible-moves.service';
import { Move } from '../models/move.model';

// Not meant to be singleton - should be provided at component level
@Injectable()
export class GameService {
  private board: Board;
  private selectedSquare?: Square;

  constructor(private movesService: PossibleMovesService) {}

  public setBoard(board: Board) {
    this.board = board;
  }

  public actOnSquare(square: Square) {
    this.clearHighlights();

    if (this.selectedSquare) {
      if (this.canMakeMove(this.selectedSquare, square)) {
        this.makeMove(
          MoveFactory.createMoveWithSquares(this.selectedSquare, square),
        );
        this.selectedSquare = undefined;
        return;
      }
    }

    this.selectedSquare = square;
    const moves = this.movesService.GetPossibleMovesForSquare(
      square,
      this.board,
    );
    this.highlightPossibleMoves(moves);
  }

  private canMakeMove(squareFrom: Square, squareTo: Square) {
    const moves = this.movesService.GetPossibleMovesForSquare(
      squareFrom,
      this.board,
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

  private makeMove(move: Move) {
    const pieceToMove =
      this.board.squares[move.from.row][move.from.column].piece();
    this.board.squares[move.from.row][move.from.column].piece.set(undefined);
    this.board.squares[move.to.row][move.to.column].piece.set(pieceToMove);
  }
}
