import { Injectable } from '@angular/core';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { Board } from '../../models/board.model';
import { Move } from '../../models/move.model';
import { Square } from '../../models/square.model';
import { RookMovesService } from './rook-moves.service';
import { BishopMovesStrategyService } from './bishop-moves-strategy.service';

@Injectable({
  providedIn: 'root',
})
export class QueenMovesStrategyService implements IPieceMovesStrategy {
  constructor(
    private rookMovesService: RookMovesService,
    private bishopMovesService: BishopMovesStrategyService,
  ) {}

  getSpecialMoves(): Move[] {
    return [];
  }

  getBasicMoves(square: Square, board: Board): Move[] {
    return this.bishopMovesService
      .getBasicMoves(square, board)
      .concat(this.rookMovesService.getBasicMoves(square, board));
  }
}
