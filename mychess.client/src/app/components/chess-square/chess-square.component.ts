import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Piece } from '../../models/piece.model';
import { ChessPieceComponent } from "../chess-piece/chess-piece.component";

@Component({
    selector: 'app-chess-square',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './chess-square.component.html',
    styleUrl: './chess-square.component.css',
    imports: [CommonModule, ChessPieceComponent]
})
export class ChessSquareComponent {
  public id = input.required<number>();
  public isBlack = input.required<boolean>();
  public piece = input<Piece>();
}
