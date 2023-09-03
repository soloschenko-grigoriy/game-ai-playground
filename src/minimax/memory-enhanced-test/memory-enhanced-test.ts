import { IBoard, IMove, IResult, ITableEntry } from './memory-enhanced-test.h'
import { TranspositionTable } from './transposition-table'

let lowestDepth = -Infinity
const table = new TranspositionTable(100000)

export const memoryEnhancedTest = (board: IBoard, maxDepth: number, currentDepth: number, gamma: number): IResult => {
  if (currentDepth > lowestDepth) {
    lowestDepth = currentDepth
  }

  // Lookup entry from transposition table
  const entry = table.getEntry(board.getHashValue())
  if (entry && entry.depth > maxDepth - currentDepth) {
    // early exits for stored positions
    if (entry.minScore > gamma) {
      return { score: entry.minScore, move: entry.bestMove }
    }

    if (entry.maxScore < gamma) {
      return { score: entry.maxScore, move: entry.bestMove }
    }

    // should never get here
    return { score: -Infinity, move: null }
  } else {
    // we need to create an entry
    let entry: ITableEntry = {
      hashValue: board.getHashValue(),
      depth: maxDepth - currentDepth,
      minScore: -Infinity,
      maxScore: Infinity,
      bestMove: null,
    }

    // now we have entry we can go on with the test

    // check if done recursing
    if (board.isGameOver() || currentDepth === maxDepth) {
      entry.minScore = entry.maxScore = board.evaluate()
      table.storeEntry(entry)

      return { score: entry.minScore, move: null }
    }

    // now go into bubbling up mode
    let bestMove: IMove | null = null
    let bestScore = -Infinity

    for (let move of board.getMoves()) {
      const newBoard = board.makeMove(move)

      // recurse
      const { score } = memoryEnhancedTest(newBoard, maxDepth, currentDepth + 1, -gamma)
      board.undoMove(move)
      const currentScore = -score

      // update the best score
      if (currentScore > bestScore) {
        // Track the current best move
        entry.bestMove = move

        bestScore = currentScore
        bestMove = move
      }
    }

    // if we pruned, then we have a min score, otherwise we have a max score
    if (bestScore < gamma) {
      entry.maxScore = bestScore
    } else {
      entry.minScore = bestScore
    }

    // Store the entry and return the best score and move
    table.storeEntry(entry)

    return { score: bestScore, move: bestMove }
  }
}
