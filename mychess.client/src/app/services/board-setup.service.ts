import { Injectable } from '@angular/core';
import { PieceColour } from "../enums/piece-colour.enum";
import { PieceType } from "../enums/piece-type.enum";
import { Board } from "../models/board.model"
import { Piece } from "../models/piece.model";
import { Square } from "../models/square.model";

@Injectable({
  providedIn: 'root'
})
export class BoardSetupService {

  constructor() { }

  public setupNewBoard(): Board {
    const board: Board = { squares: [] };
    for (let i = 63; i >= 0; i--) {
      const square: Square = {
        id: i,
        isBlack: this.IsSquareBlack(i),
        piece: this.getInitialPieceForSquare(i)
      }
      board.squares.push(square);
    }
    return board;
  }

  private IsSquareBlack(squareId: number): boolean {
    return (squareId + Math.floor(squareId/8))%2 == 0
  }

  private getInitialPieceForSquare(squareId: number): Piece | undefined {
    if (!this.shouldSquareHavePiece(squareId)) {
      return undefined;
    }

    return {
      colour: this.getPieceColour(squareId)!,
      type: this.getPieceType(squareId)!
    }
  }

  private shouldSquareHavePiece(squareId: number): boolean {
    if (squareId < 0 || squareId > 63 || (squareId > 15 && squareId < 48)) {
      return false;
    }

    return true;
  }

  private getPieceColour(squareId: number): PieceColour | undefined {
    if (squareId < 16) {
      return PieceColour.White;
    }
    else if (squareId > 47) {
      return PieceColour.Black
    }
    
    return undefined;
  }

  private getPieceType(squareId: number): PieceType | undefined {
    if (squareId === 0 || squareId === 7 || squareId === 56 || squareId === 63) {
      return PieceType.Rook;
    }
    if (squareId === 1 || squareId === 6 || squareId === 57 || squareId === 62) {
      return PieceType.Knight;
    }
    if (squareId === 2 || squareId === 5 || squareId === 58 || squareId === 61) {
      return PieceType.Bishop;
    }
    if (squareId === 3 || squareId === 59) {
      return PieceType.Queen;
    }
    if (squareId === 4 || squareId === 60) {
      return PieceType.King;
    }
    if (squareId >= 8 && squareId <= 15 || squareId >= 48 && squareId <= 55) {
      return PieceType.Pawn;
    }
  
    return undefined;
  }
}
