import { IBoard, IResult, negamax } from '../negamax'

export const aspirationSearch = (board: IBoard, maxDepth: number, previousScore: number, window: number): IResult => {
  let alpha = previousScore - window
  let beta = previousScore + window

  while (true) {
    const { score, move } = negamax(board, maxDepth, 0, alpha, beta)
    if (score <= alpha) {
      console.log(`fail low: ${score} <= ${alpha}`)
      alpha = -Infinity
    } else if (score >= beta) {
      console.log(`fail high: ${score} >= ${beta}`)
      beta = Infinity
    } else {
      return { score, move }
    }
  }
}
