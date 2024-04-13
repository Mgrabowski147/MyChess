import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChessSquareComponent } from '../chess-square/chess-square.component';
import { Board } from '../../models/board.model';
import { ChessPieceComponent } from '../chess-piece/chess-piece.component';
import { BoardSetupService } from '../../services/board-setup.service';
import { Square } from '../../models/square.model';
import { cloneDeep } from 'lodash-es';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-chess-board',
  standalone: true,
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChessSquareComponent, ChessPieceComponent],
  providers: [GameService],
})
export class ChessBoardComponent implements OnInit {
  public board: Board;
  public displayBoard: Board;

  constructor(
    private boardSetupService: BoardSetupService,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.board = this.boardSetupService.SetupNewBoard();
    this.displayBoard = cloneDeep(this.board);
    this.displayBoard.squares.reverse();
    this.gameService.setBoard(this.board);
  }

  onSquareClick(square: Square) {
    this.gameService.actOnSquare(square);
  }
}
