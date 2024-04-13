import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';

export interface IPieceMovesStrategy {
  getMoves(square: Square, board: Board): Move[];
}
