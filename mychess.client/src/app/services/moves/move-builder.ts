import { PieceType } from '../../enums/piece-type.enum';
import { Coordinates } from '../../models/coordinates.model';
import { MoveSpecialEffect } from '../../models/move-special-effect.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';

export class MoveBuilder {
  private move = new Move();

  public fromSquare(square: Square): MoveBuilder {
    this.move.from = {
      column: square.coordinates.column,
      row: square.coordinates.row,
    };

    return this;
  }

  public toSquare(square: Square): MoveBuilder {
    this.move.to = {
      column: square.coordinates.column,
      row: square.coordinates.row,
    };

    return this;
  }

  public toCoords(coordinates: Coordinates): MoveBuilder {
    this.move.to = {
      column: coordinates.column,
      row: coordinates.row,
    };

    return this;
  }

  public withPiece(pieceType: PieceType): MoveBuilder {
    this.move.pieceType = pieceType;

    return this;
  }

  public withSpecialEffect(effect: MoveSpecialEffect): MoveBuilder {
    this.move.specialEffect = effect;

    return this;
  }

  public build(): Move {
    if (
      this.move.from == null ||
      this.move.to == null ||
      this.move.pieceType == null
    ) {
      throw 'move is not complete';
    }

    return this.move;
  }
}
