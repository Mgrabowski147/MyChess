import { MoveSpecialEffectType } from '../enums/move-special-effect-type.enum';
import { Coordinates } from './coordinates.model';

// used during special moves (en passant and castling), defines additional effect on other pieces
export class MoveSpecialEffect {
  specialEffectType: MoveSpecialEffectType;
  squareToAffect: Coordinates;
  destinationSquare?: Coordinates;
}
