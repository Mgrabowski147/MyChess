import { PieceType } from '../enums/piece-type.enum';
import { Coordinates } from './coordinates.model';
import { MoveSpecialEffect } from './move-special-effect.model';

export class Move {
  from: Coordinates;
  to: Coordinates;
  pieceType: PieceType;

  // used during special moves (en passant and castling), defines additional effect on other pieces
  specialEffect?: MoveSpecialEffect;
}
