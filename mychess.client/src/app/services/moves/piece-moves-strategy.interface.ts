import { Board } from '../../models/board.model';
import { Game } from '../../models/game.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';

export interface IPieceMovesStrategy {
  getBasicMoves(square: Square, board: Board): Move[];
  getSpecialMoves(square: Square, board: Board, game: Game): Move[];
}
