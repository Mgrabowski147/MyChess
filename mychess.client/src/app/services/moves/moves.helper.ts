import { Square } from '../../models/square.model';

export class MovesHelper {
  public static canMoveToSquare(
    mySquare: Square,
    squareToCheck: Square,
  ): boolean {
    return (
      !this.isSquareTaken(squareToCheck) ||
      this.isSquareTakenByEnemyPiece(mySquare, squareToCheck)
    );
  }

  public static canPassSquare(squareToCheck: Square): boolean {
    return !this.isSquareTaken(squareToCheck);
  }

  public static isSquareTakenByEnemyPiece(
    mySquare: Square,
    squareToCheck: Square,
  ): boolean {
    return squareToCheck.piece()?.colour !== mySquare.piece()?.colour;
  }

  public static isSquareTaken(squareToCheck: Square): boolean {
    return squareToCheck.piece() !== undefined;
  }
}
