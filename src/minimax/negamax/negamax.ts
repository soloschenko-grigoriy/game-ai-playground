import { IBoard, IResult, IMove, IPlayer } from './negamax.h'

export function negamax(board: IBoard, maxDepth: number, currentDepth: number, alpha: number, beta: number): IResult {
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
    const { score } = negamax(newBoard, maxDepth, currentDepth + 1, -beta, -Math.max(alpha, bestScore))
    board.undoMove(move)

    const currentScore = -score

    // Update the best score
    if (currentScore > bestScore) {
      bestScore = currentScore
      bestMove = move
    }

    if (bestScore >= beta) {
      return { score: bestScore, move: bestMove }
    }
  }

  // Return the score and the best move
  return { score: bestScore, move: bestMove }
}
