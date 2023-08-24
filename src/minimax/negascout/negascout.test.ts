import { ITicTacToeMove, ITicTacToePlayer, TicTacToeBoard } from '../negamax/example'
import { negascout } from './negascout'

describe('negascout', () => {
  const player1: ITicTacToePlayer = {
    id: 'x',
  }

  const player2: ITicTacToePlayer = {
    id: 'o',
  }

  it('should return the best score and a move', () => {
    const maxDepth = 3
    const board = new TicTacToeBoard(player1, player2, player1)

    // board is empty and the beginning
    expect(board.nodes).toStrictEqual<string[][]>([
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ])

    const { move: move1, score: score1 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move1).toEqual({ x: 1, y: 1 })
    expect(score1).toBe(5)

    // no moves was made on actual board (aka cloning works)
    expect(board.nodes).toStrictEqual<string[][]>([
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ])

    // make move
    board.makeMove(move1 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      [' ', ' ', ' '],
      [' ', 'x', ' '],
      [' ', ' ', ' '],
    ])

    // next turn
    const { move: move2, score: score2 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move2).toEqual({ x: 0, y: 0 })
    expect(score2).toBe(-0)

    board.makeMove(move2 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', ' ', ' '],
      [' ', 'x', ' '],
      [' ', ' ', ' '],
    ])

    const { move: move3, score: score3 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move3).toEqual({ x: 1, y: 2 })
    expect(score3).toBe(5)

    board.makeMove(move3 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', ' ', ' '],
      [' ', 'x', ' '],
      [' ', 'x', ' '],
    ])

    const { move: move4, score: score4 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move4).toEqual({ x: 1, y: 0 })
    expect(score4).toBe(1)

    board.makeMove(move4 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', ' '],
      [' ', 'x', ' '],
      [' ', 'x', ' '],
    ])

    const { move: move5, score: score5 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move5).toEqual({ x: 2, y: 0 })
    expect(score5).toBe(4)

    board.makeMove(move5 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', 'x'],
      [' ', 'x', ' '],
      [' ', 'x', ' '],
    ])

    const { move: move6, score: score6 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move6).toEqual({ x: 0, y: 2 })
    expect(score6).toBe(-0)

    board.makeMove(move6 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', 'x'],
      [' ', 'x', ' '],
      ['o', 'x', ' '],
    ])

    const { move: move7, score: score7 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move7).toEqual({ x: 0, y: 1 })
    expect(score7).toBe(-0)

    board.makeMove(move7 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', 'x'],
      ['x', 'x', ' '],
      ['o', 'x', ' '],
    ])

    const { move: move8, score: score8 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move8).toEqual({ x: 2, y: 1 })
    expect(score8).toBe(0)

    board.makeMove(move8 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(false)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', 'x'],
      ['x', 'x', 'o'],
      ['o', 'x', ' '],
    ])

    const { move: move9, score: score9 } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    expect(move9).toEqual({ x: 2, y: 2 })
    expect(score9).toBe(-0)

    board.makeMove(move9 as ITicTacToeMove)
    expect(board.isGameOver()).toBe(true)
    expect(board.nodes).toStrictEqual<string[][]>([
      ['o', 'o', 'x'],
      ['x', 'x', 'o'],
      ['o', 'x', 'x'],
    ])
  })

  it('should work', () => {
    // just playthru

    const maxDepth = 3
    const board = new TicTacToeBoard(player1, player2, player1)

    let x = null

    while (board.isGameOver() === false) {
      const { move, score } = negascout(board.clone(), maxDepth, 0, -10, 10)
      board.makeMove(move as ITicTacToeMove)
      console.log('score', score)
      console.log(board.toString())
      x = score
    }

    // console.log('x', x)
  })

  it('simple benchmark', () => {
    const maxDepth = 10
    const board = new TicTacToeBoard(player1, player2, player1)

    const start = Date.now()

    const res = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
    const end = Date.now()
    console.log(`time: ${end - start}ms, score: ${res.score}`)
  })

  it('benchmark', () => {
    const play = (attempt: number): number => {
      const start = Date.now()

      const maxDepth = 10
      const board = new TicTacToeBoard(player1, player2, player1)

      while (board.isGameOver() === false) {
        const { move, score } = negascout(board.clone(), maxDepth, 0, -Infinity, Infinity)
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
    // 1000: { min: 22, max: 48, avg: 23.401, med: 23 }
  })
})
