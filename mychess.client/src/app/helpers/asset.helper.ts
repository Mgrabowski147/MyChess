import { PieceColour } from "../enums/piece-colour.enum";
import { PieceType } from "../enums/piece-type.enum";
import { Piece } from "../models/piece.model";

export class AssetHelper {
  private static readonly colourMap = new Map<PieceColour, string>([
    [PieceColour.Black, 'black'],
    [PieceColour.White, 'white'],
  ])

  private static readonly typeMap = new Map<PieceType, string>([
    [PieceType.King, 'king'],
    [PieceType.Queen, 'queen'],
    [PieceType.Rook, 'rook'],
    [PieceType.Knight, 'knight'],
    [PieceType.Bishop, 'bishop'],
    [PieceType.Pawn, 'pawn'],
  ])


  public static getPieceAssetPath(piece: Piece): string {
    const basePath = 'assets/pieces/basic/';
    const colour = this.colourMap.get(piece.colour);
    const type = this.typeMap.get(piece.type);
    return basePath + colour + '_' +  type + '.png';
  }
}