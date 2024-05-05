import { Injectable } from '@angular/core';
import { Coordinates } from '../../models/coordinates.model';
import { Square } from '../../models/square.model';
import { Move } from '../../models/move.model';
import { PieceType } from '../../enums/piece-type.enum';

@Injectable({
  providedIn: 'root',
})
export class MoveFactory {
  constructor() {}

  public static createMoveWithCoordinates(
    coordsFrom: Coordinates,
    coordsTo: Coordinates,
    pieceType: PieceType,
  ): Move {
    return this.createMoveWithRowsAndColumns(
      coordsFrom.row,
      coordsFrom.column,
      coordsTo.row,
      coordsTo.column,
      pieceType,
    );
  }

  public static createMoveWithSquares(
    squareFrom: Square,
    squareTo: Square,
    pieceType: PieceType,
  ): Move {
    return this.createMoveWithRowsAndColumns(
      squareFrom.coordinates.row,
      squareFrom.coordinates.column,
      squareTo.coordinates.row,
      squareTo.coordinates.column,
      pieceType,
    );
  }

  public static createMoveFromSquareToCoords(
    squareFrom: Square,
    coordsTo: Coordinates,
    pieceType: PieceType,
  ): Move {
    return this.createMoveWithRowsAndColumns(
      squareFrom.coordinates.row,
      squareFrom.coordinates.column,
      coordsTo.row,
      coordsTo.column,
      pieceType,
    );
  }

  public static createMoveWithRowsAndColumns(
    rowFrom: number,
    columnFrom: number,
    rowTo: number,
    columnTo: number,
    pieceType: PieceType,
  ): Move {
    return {
      from: {
        row: rowFrom,
        column: columnFrom,
      },
      to: {
        row: rowTo,
        column: columnTo,
      },
      pieceType: pieceType,
    };
  }
}
