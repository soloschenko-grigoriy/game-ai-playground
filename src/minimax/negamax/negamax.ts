import { IBoard, IResult, IMove, IPlayer } from './negamax.h'

export function negamax(board: IBoard, maxDepth: number, currentDepth: number): IResult {
  if (board.isGameOver() || currentDepth === maxDepth) {
    return { score: board.evaluate(), move: null }
  }

  // Otherwise bubble up values from below
  let bestMove: IMove | null = null
  let bestScore = -Infinity

  // Go thru each move
  for (let move of board.getMoves()) {
    const newBoard = board.makeMove(move)

    // Recurse
    const { score: recursedScore } = negamax(newBoard, maxDepth, currentDepth + 1)

    const currentScore = -recursedScore

    // Update the best score
    if (recursedScore > bestScore) {
      bestScore = currentScore
      bestMove = move
    }
  }

  // Return the score and the best move
  return { score: bestScore, move: bestMove }
}
