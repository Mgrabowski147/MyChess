import { WritableSignal, signal } from '@angular/core';
import { Piece } from './piece.model';
import { Coordinates } from './coordinates.model';

export class Square {
  coordinates: Coordinates;
  isBlack: boolean;
  piece: WritableSignal<Piece | undefined>;
  isHighlighted: WritableSignal<boolean>;

  constructor(
    row: number,
    column: number,
    isBlack: boolean,
    piece: Piece | undefined,
    isHighlighted: boolean,
  ) {
    this.coordinates = new Coordinates();
    this.coordinates.row = row;
    this.coordinates.column = column;
    this.isBlack = isBlack;
    this.piece = signal(piece);
    this.isHighlighted = signal(isHighlighted);
  }
}
