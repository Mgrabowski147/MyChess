import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChessPieceComponent } from '../chess-piece/chess-piece.component';
import { Square } from '../../models/square.model';

@Component({
  selector: 'app-chess-square',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chess-square.component.html',
  styleUrl: './chess-square.component.css',
  imports: [CommonModule, ChessPieceComponent],
})
export class ChessSquareComponent {
  public square = input.required<Square>();
}
