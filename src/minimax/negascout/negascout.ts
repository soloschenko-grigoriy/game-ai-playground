import { negamax } from '../negamax'

export interface IBoard {
  getMoves(): IMove[]
  makeMove(move: IMove): IBoard
  undoMove(move: IMove): IBoard
  evaluate(): number
  isGameOver(): boolean
}

export interface IPlayer {}

export interface IMove {}

export interface IResult {
  score: number
  move: IMove | null
}

export const negascout = (
  board: IBoard,
  maxDepth: number,
  currentDepth: number,
  alpha: number,
  beta: number,
): IResult => {
  // check if done recursing
  if (board.isGameOver() || currentDepth === maxDepth) {
    return { score: board.evaluate(), move: null }
  }

  // otherwise bubble up values from below
  let bestMove = null
  let bestScore = -Infinity

  // keep track of the Test window value
  let adaptiveBeta = beta

  // go through each move
  for (let move of board.getMoves()) {
    const newBoard = board.makeMove(move)

    // Recurse
    const { score: recursedScore } = negamax(
      newBoard,
      maxDepth,
      currentDepth + 1,
      -adaptiveBeta,
      -Math.max(alpha, bestScore),
    )

    board.undoMove(move)

    const currentScore = -recursedScore

    // Update the best score
    if (currentScore > bestScore) {
      // if we are in narrow-mode then widen the window and do a regular AB negamax search
      if (adaptiveBeta === beta || currentDepth >= maxDepth - 2) {
        bestScore = currentScore
        bestMove = move
      } else {
        // otherwise we can do a Test
        const { score: negativeBestScore, move: bestNegativeMove } = negascout(
          newBoard,
          maxDepth,
          currentDepth,
          -beta,
          -currentScore,
        )
        bestScore = -negativeBestScore
        bestMove = move
      }

      //  if we're outside the bounds, then prune: exit immediately
      if (bestScore >= beta) {
        return { score: bestScore, move: bestMove }
      }

      // otherwise update the window location
      adaptiveBeta = Math.max(alpha, bestScore) + 1
    }
  }

  return { score: bestScore, move: bestMove }
}
