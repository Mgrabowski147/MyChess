import { PieceType } from '../enums/piece-type.enum';
import { Coordinates } from './coordinates.model';

export class Move {
  from: Coordinates;
  to: Coordinates;
  pieceType: PieceType;
}
