import { ITicTacToeMove, ITicTacToePlayer, TicTacToeBoard } from '../negamax/example'
import { aspirationSearch } from './aspiration'

describe('aspiration', () => {
  const player1: ITicTacToePlayer = {
    id: 'x',
  }

  const player2: ITicTacToePlayer = {
    id: 'o',
  }

  it('should work', () => {
    // just playthru

    const start = Date.now()

    const maxDepth = 3
    const board = new TicTacToeBoard(player1, player2, player1)

    while (board.isGameOver() === false) {
      const { move, score } = aspirationSearch(board.clone(), maxDepth, 5, 10)
      board.makeMove(move as ITicTacToeMove)
      console.log('score', score)
      console.log(board.toString())
    }
    console.log('time', Date.now() - start)
  })

  it('benchmark', () => {
    const play = (attempt: number): number => {
      const start = Date.now()

      const maxDepth = 10
      const board = new TicTacToeBoard(player1, player2, player1)

      while (board.isGameOver() === false) {
        const { move, score } = aspirationSearch(board.clone(), maxDepth, -0, 3)
        board.makeMove(move as ITicTacToeMove)
      }

      return Date.now() - start
    }

    const results: number[] = []
    for (let i = 0; i < 1000; i++) {
      results[i] = play(i)
    }

    const data = {
      min: Math.min(...results),
      max: Math.max(...results),
      avg: results.reduce((acc, curr) => acc + curr, 0) / results.length,
      med: results.sort()[Math.floor(results.length / 2)],
    }

    console.log(data)
    // for maxDepth = 10, window = 10, prev value 5
    // 10: { min: 22, max: 45, avg: 24.9, med: 23 } - aspiration
    // 10: { min: 22, max: 48, avg: 24.9, med: 22 } - regular negamax

    // 100: { min: 22, max: 46, avg: 22.77, med: 22 } - aspiration
    // 100: { min: 21, max: 46, avg: 22.53, med: 22 } - regular negamax

    // 1000: { min: 22, max: 47, avg: 22.905, med: 23 } - aspiration
    // 1000: { min: 22, max: 46, avg: 23.013, med: 23 } - regular negamax

    // for maxDepth = 10, window = 3, prev value -0
    // 100: { min: 22, max: 49, avg: 23.16, med: 23 }
    // 1000: { min: 21, max: 46, avg: 22.564, med: 22 }
  })
})
