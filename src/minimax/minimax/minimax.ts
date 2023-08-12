import { IBoard, IResult, IMove, IPlayer } from './minimax.h'

export function minimax(board: IBoard, player: IPlayer, maxDepth: number, currentDepth: number): IResult {
  if (board.isGameOver() || currentDepth === maxDepth) {
    return { score: board.evaluate(player), move: null }
  }

  // Otherwise bubble up values from below
  let bestMove: IMove | null = null
  let bestScore = board.currentPlayer === player ? -Infinity : Infinity

  // Go thru each move
  for (let move of board.getMoves()) {
    const newBoard = board.makeMove(move)

    // Recurse
    const { score: currentScore } = minimax(newBoard, player, maxDepth, currentDepth + 1)

    // Update the best score
    if (board.currentPlayer === player) {
      if (currentScore > bestScore) {
        bestScore = currentScore
        bestMove = move
      }
    } else {
      if (currentScore < bestScore) {
        bestScore = currentScore
        bestMove = move
      }
    }
  }

  // Return the score and the best move
  return { score: bestScore, move: bestMove }
}
