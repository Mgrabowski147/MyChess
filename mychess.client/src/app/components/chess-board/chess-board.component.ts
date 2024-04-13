import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChessSquareComponent } from '../chess-square/chess-square.component';
import { Board } from '../../models/board.model';
import { ChessPieceComponent } from '../chess-piece/chess-piece.component';
import { BoardSetupService } from '../../services/board-setup.service';

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

  constructor(private boardSetupService: BoardSetupService) {}

  ngOnInit(): void {
    this.board = this.boardSetupService.SetupNewBoard();
  }
}
