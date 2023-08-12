import { ITicTacToeMove, ITicTacToePlayer, TicTacToeBoard } from './example'
import { negamax } from './negamax'

describe('negamax', () => {
  describe('in tic-tac-toe', () => {
    const player1: ITicTacToePlayer = {
      id: 'x',
    }

    const player2: ITicTacToePlayer = {
      id: 'o',
    }

    const players = [player1, player2]

    describe('evaluation function', () => {
      it('should return 1 if player has 3 in a row', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 2, y: 0 } })
          .makeMove({ to: { x: 2, y: 2 } })

        expect(board.evaluate()).toBe(1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'x', 'x'],
          ['o', 'o', ' '],
          [' ', ' ', 'o'],
        ])
      })

      it('should return 1 if player has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 0, y: 2 } })
          .makeMove({ to: { x: 2, y: 2 } })

        expect(board.evaluate()).toBe(1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'o', ' '],
          ['x', 'o', ' '],
          ['x', ' ', 'o'],
        ])
      })

      it('should return 1 if player has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 2, y: 1 } })
          .makeMove({ to: { x: 2, y: 2 } })
          .makeMove({ to: { x: 1, y: 0 } })

        expect(board.evaluate()).toBe(1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'o', ' '],
          ['o', 'x', 'o'],
          [' ', ' ', 'x'],
        ])
      })

      it('should return -1 if opponent has 3 in a row', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 2, y: 0 } })

        expect(board.evaluate()).toBe(-1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'x', 'x'],
          ['o', 'o', ' '],
          [' ', ' ', ' '],
        ])
      })

      it('should return -1 if opponent has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 0, y: 2 } })

        expect(board.evaluate()).toBe(-1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'o', ' '],
          ['x', 'o', ' '],
          ['x', ' ', ' '],
        ])
      })

      it('should return -1 if opponent has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 2, y: 1 } })
          .makeMove({ to: { x: 2, y: 2 } })

        expect(board.evaluate()).toBe(-1)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', ' ', ' '],
          ['o', 'x', 'o'],
          [' ', ' ', 'x'],
        ])
      })

      it('should return 0 if no one has 3 in a row', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 2, y: 0 } })

        expect(board.evaluate()).toBe(0)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'o', 'x'],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])
      })

      it('should return 0 if no one has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 0, y: 2 } })

        expect(board.evaluate()).toBe(0)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', ' ', ' '],
          ['o', ' ', ' '],
          ['x', ' ', ' '],
        ])
      })

      it('should return 0 if no one has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 1, y: 1 } })

        expect(board.evaluate()).toBe(0)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', ' ', ' '],
          ['o', 'x', ' '],
          [' ', ' ', ' '],
        ])
      })

      it('should return 0 if the board is full', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 } })
          .makeMove({ to: { x: 0, y: 1 } })
          .makeMove({ to: { x: 0, y: 2 } })

          .makeMove({ to: { x: 1, y: 1 } })
          .makeMove({ to: { x: 1, y: 0 } })
          .makeMove({ to: { x: 2, y: 0 } })

          .makeMove({ to: { x: 1, y: 2 } })
          .makeMove({ to: { x: 2, y: 2 } })
          .makeMove({ to: { x: 2, y: 1 } })

        expect(board.evaluate()).toBe(0)
        expect(board.getState()).toStrictEqual<string[][]>([
          ['x', 'x', 'o'],
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
        ])
      })

      it('should return 0 if the board is empty', () => {
        const board = new TicTacToeBoard(players, player1)

        expect(board.evaluate()).toBe(0)
        expect(board.getState()).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])
      })
    })

    it('should return the best score and a move', () => {
      const maxDepth = 3
      const board = new TicTacToeBoard(players, player1)

      // board is empty and the beginning
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move1, score: score1 } = negamax(board.clone(), maxDepth, 0)
      expect(move1).toEqual({ to: { x: 1, y: 2 }, byPlayer: player1 })
      expect(score1).toBe(2)

      // no moves was made on actual board (aka cloning works)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ])

      // make move
      board.makeMove(move1 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', 'x', ' '],
      ])

      // next turn
      const { move: move2, score: score2 } = negamax(board.clone(), maxDepth, 0)
      expect(move2).toEqual({ to: { x: 1, y: 2 }, byPlayer: player2 })
      expect(score2).toBe(2)

      board.makeMove(move2 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', 'o', 'x'],
      ])

      const { move: move3, score: score3 } = negamax(board.clone(), maxDepth, 0)
      expect(move3).toEqual({ to: { x: 0, y: 0 }, byPlayer: player1 })
      expect(score3).toBe(2)

      board.makeMove(move3 as ITicTacToeMove)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', 'o', 'x'],
      ])
      expect(board.isGameOver()).toBe(false)

      const { move: move4, score: score4 } = negamax(board.clone(), maxDepth, 0)
      expect(move4).toEqual({ to: { x: 0, y: 1 }, byPlayer: player2 })
      expect(score4).toBe(2)

      board.makeMove(move4 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', ' ', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move5, score: score5 } = negamax(board.clone(), maxDepth, 0)
      expect(move5).toEqual({ to: { x: 0, y: 2 }, byPlayer: player1 })
      expect(score5).toBe(2)

      board.makeMove(move5 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        ['x', 'x', ' '],
        ['x', 'o', 'o'],
      ])

      const { move: move6, score: score6 } = negamax(board.clone(), maxDepth, 0)
      expect(move6).toEqual({ to: { x: 0, y: 0 }, byPlayer: player2 })
      expect(score6).toBe(2)

      board.makeMove(move6 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['o', ' ', ' '],
        ['x', 'x', ' '],
        ['x', 'o', 'o'],
      ])

      const { move: move7, score: score7 } = negamax(board.clone(), maxDepth, 0)
      expect(move7).toEqual({ to: { x: 2, y: 1 }, byPlayer: player1 })
      expect(score7).toBe(2)

      board.makeMove(move7 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['o', ' ', ' '],
        ['x', 'x', 'x'],
        ['x', 'o', 'o'],
      ])

      const { move: move8, score: score8 } = negamax(board.clone(), maxDepth, 0)
      expect(move8).toEqual({ to: { x: 1, y: 2 }, byPlayer: player2 })
      expect(score8).toBe(2)

      board.makeMove(move8 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['x', 'o', ' '],
      ])

      const { move: move9, score: score9 } = negamax(board.clone(), maxDepth, 0)
      expect(move9).toEqual({ to: { x: 2, y: 2 }, byPlayer: player1 })
      expect(score9).toBe(2)

      board.makeMove(move9 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(true)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['x', 'o', 'x'],
      ])
    })
  })
})
