import { IBoard, IResult, negamax } from '../negamax'

export const aspirationSearch = (board: IBoard, maxDepth: number, previousScore: number, window: number): IResult => {
  let alpha = previousScore - window
  let beta = previousScore + window

  while (true) {
    const { score, move } = negamax(board, maxDepth, 0, alpha, beta)
    if (score <= alpha) {
      alpha = -Infinity
      //   console.log(`fail low: ${score} <= ${alpha}`)
    } else if (score >= beta) {
      beta = Infinity
      //   console.log(`fail high: ${score} >= ${beta}`)
    } else {
      return { score, move }
    }
  }
}
