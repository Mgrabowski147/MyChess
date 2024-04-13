import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChessSquareComponent } from '../chess-square/chess-square.component';
import { Board } from '../../models/board.model';
import { ChessPieceComponent } from '../chess-piece/chess-piece.component';
import { BoardSetupService } from '../../services/board-setup.service';
import { Square } from '../../models/square.model';
import { MovesService } from '../../services/moves.service';
import { cloneDeep } from 'lodash-es';

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

  constructor(
    private boardSetupService: BoardSetupService,
    private movesService: MovesService,
  ) {}

  ngOnInit(): void {
    this.board = this.boardSetupService.SetupNewBoard();
    this.displayBoard = cloneDeep(this.board);
    this.displayBoard.squares.reverse();
  }

  onSquareClick(square: Square) {
    this.board.squares.forEach(row => row.forEach(square => {
      square.isHighlighted.set(false);
    }));
    
    const moves = this.movesService.GetPossibleMovesForSquare(square, this.board);
    moves.forEach(move => {
      this.board.squares[move.to.row][move.to.column].isHighlighted.set(true);
    })
  }
}
