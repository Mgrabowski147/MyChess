import { Component, Signal, computed, input } from '@angular/core';
import { Piece } from '../../models/piece.model';
import { AssetHelper } from '../../helpers/asset.helper';

@Component({
  selector: 'app-chess-piece',
  standalone: true,
  imports: [],
  templateUrl: './chess-piece.component.html',
  styleUrl: './chess-piece.component.css'
})
export class ChessPieceComponent {
  public piece = input.required<Piece>();
  public assetPath = computed(() => {
    return AssetHelper.getPieceAssetPath(this.piece());
  })

  log(path: Signal<string>) {
    console.log(path());
  }
}
