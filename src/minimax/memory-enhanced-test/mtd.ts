import { IMove } from '../negamax'
import { memoryEnhancedTest } from './memory-enhanced-test'
import { IBoard, IResult } from './memory-enhanced-test.h'

const MAX_ITERATIONS = 100

export const mtd = (board: IBoard, maxDepth: number, guess: number): IResult => {
  let move: IMove | null = null

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const gamma = guess

    const result = memoryEnhancedTest(board, maxDepth, 0, gamma - 1)

    if (!result.move) {
      break
    }

    guess = result.score
    move = result.move

    // If there's no more improvements, stop looking
    if (gamma === guess) {
      break
    }
  }

  return { score: guess, move }
}
