import { Signal, signal } from "@angular/core";
import { Piece } from "./piece.model";

export class Square {
  row: number;
  column: number
  isBlack: boolean;
  piece: Signal<Piece | undefined>;
  isHighlighted: Signal<boolean>

  constructor(
    row: number,
    column: number,
    isBlack: boolean,
    piece: Piece | undefined,
    isHighlighted: boolean) {
    this.row = row;
    this.column = column;
    this.isBlack = isBlack;
    this.piece = signal(piece);
    this.isHighlighted = signal(isHighlighted);
  }
}