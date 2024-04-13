import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChessSquareComponent } from '../chess-square/chess-square.component';
import { Board } from '../../models/board.model';
import { ChessPieceComponent } from '../chess-piece/chess-piece.component';
import { BoardSetupService } from '../../services/board-setup.service';
import { Square } from '../../models/square.model';
import { PossibleMovesService } from '../../services/moves/possible-moves.service';
import { cloneDeep } from 'lodash-es';
import { Move } from '../../models/move.model';
import { MoveFactory } from '../../services/moves/MoveFactory';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChessSquareComponent, ChessPieceComponent],
})
export class ChessBoardComponent implements OnInit {
  public board: Board;
  public displayBoard: Board;

  private selectedSquare?: Square;

  constructor(
    private boardSetupService: BoardSetupService,
    private movesService: PossibleMovesService,
  ) {}

  ngOnInit(): void {
    this.board = this.boardSetupService.SetupNewBoard();
    this.displayBoard = cloneDeep(this.board);
    this.displayBoard.squares.reverse();
  }

  onSquareClick(square: Square) {
    this.clearHighlights();

    if (!this.selectedSquare) {
      this.selectedSquare = square;
      const moves = this.movesService.GetPossibleMovesForSquare(
        square,
        this.board,
      );
      this.highlightPossibleMoves(moves);
    } else {
      if (this.canMakeMove(this.selectedSquare, square)) {
        this.makeMove(
          MoveFactory.createMoveWithSquares(this.selectedSquare, square),
        );
      }
      this.selectedSquare = undefined;
    }
  }

  private canMakeMove(squareFrom: Square, squareTo: Square) {
    const moves = this.movesService.GetPossibleMovesForSquare(
      squareFrom,
      this.board,
    );

    return moves.some(
      (move) =>
        move.to.column === squareTo.coordinates.column &&
        move.to.row === squareTo.coordinates.row,
    );
  }

  private clearHighlights() {
    this.board.squares.forEach((row) =>
      row.forEach((square) => {
        square.isHighlighted.set(false);
      }),
    );
  }

  private highlightPossibleMoves(moves: Move[]) {
    moves.forEach((move) => {
      this.board.squares[move.to.row][move.to.column].isHighlighted.set(true);
    });
  }

  private makeMove(move: Move) {
    const pieceToMove =
      this.board.squares[move.from.row][move.from.column].piece();
    this.board.squares[move.from.row][move.from.column].piece.set(undefined);
    this.board.squares[move.to.row][move.to.column].piece.set(pieceToMove);
  }
}
