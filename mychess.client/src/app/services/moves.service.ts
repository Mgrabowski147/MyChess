import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Square } from '../models/square.model';
import { Move } from '../models/move.model';
import { PieceType } from '../enums/piece-type.enum';
import { PieceColour } from '../enums/piece-colour.enum';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor() { }

  public GetPossibleMovesForSquare(square: Square, board: Board): Move[] {
    const moves: Move[] = [];

    if (!square.piece) {
      return [];
    }

    switch(square.piece()?.type) {
      case PieceType.Pawn:
        return this.getPawnMoves(square, board);
    }

    return moves;
  }

  private getPawnMoves(square: Square, board: Board): Move[] {
    const moves: Move[] = [];

    if (square.piece()?.colour === PieceColour.White) {
      moves.push({ 
        from: square.coordinates,
        to: { row: square.coordinates.row + 1, column: square.coordinates.column }
      })
    }
    else {
      moves.push({ 
        from: square.coordinates,
        to: { row: square.coordinates.row - 1, column: square.coordinates.column }
      })
    }

    return moves;
  }
}
