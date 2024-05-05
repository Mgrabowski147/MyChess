import { Injectable, Injector, Type } from '@angular/core';
import { Board } from '../../models/board.model';
import { Square } from '../../models/square.model';
import { Move } from '../../models/move.model';
import { PieceType } from '../../enums/piece-type.enum';
import { PawnMovesService } from './pawn-moves.service';
import { RookMovesService } from './rook-moves.service';
import { IPieceMovesStrategy } from './piece-moves-strategy.interface';
import { BishopMovesStrategyService } from './bishop-moves-strategy.service';
import { KnightMovesService } from './knight-moves-strategy.service';
import { QueenMovesStrategyService } from './queen-moves-strategy.service';
import { KingMovesStrategyService } from './king-moves-strategy.service';
import { Game } from '../../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class PossibleMovesService {
  private readonly strategyMap = new Map<PieceType, Type<IPieceMovesStrategy>>([
    [PieceType.Pawn, PawnMovesService],
    [PieceType.Rook, RookMovesService],
    [PieceType.Bishop, BishopMovesStrategyService],
    [PieceType.Knight, KnightMovesService],
    [PieceType.Queen, QueenMovesStrategyService],
    [PieceType.King, KingMovesStrategyService],
  ]);

  constructor(private injector: Injector) {}

  public GetPossibleMovesForSquare(
    square: Square,
    board: Board,
    game: Game,
  ): Move[] {
    const moves: Move[] = [];

    if (!square.piece()) {
      return [];
    }

    const movesStrategyType = this.strategyMap.get(square.piece()!.type);

    if (movesStrategyType) {
      const strategy =
        this.injector.get<IPieceMovesStrategy>(movesStrategyType);
      return strategy
        .getBasicMoves(square, board)
        .concat(strategy.getSpecialMoves(square, board, game));
    }

    return moves;
  }
}
