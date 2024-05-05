import { PlayerColour } from '../enums/piece-colour.enum';
import { Move } from './move.model';

export class Game {
  moves: Move[] = [];
  activePlayer: PlayerColour = PlayerColour.White;
  whiteCastled: boolean = false;
  blackCastled: boolean = false;
}
