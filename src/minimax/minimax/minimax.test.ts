import { ITicTacToeMove, ITicTacToePlayer, TicTacToeBoard } from './example'
import { minimax } from './minimax'

describe('minimax', () => {
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
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 1, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 2, y: 0 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(1)
      })

      it('should return 1 if player has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 0, y: 1 }, byPlayer: player1 })
          .makeMove({ to: { x: 0, y: 2 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(1)
      })

      it('should return 1 if player has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 1, y: 1 }, byPlayer: player1 })
          .makeMove({ to: { x: 2, y: 2 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(1)
      })

      it('should return -1 if opponent has 3 in a row', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player2 })
          .makeMove({ to: { x: 1, y: 0 }, byPlayer: player2 })
          .makeMove({ to: { x: 2, y: 0 }, byPlayer: player2 })

        expect(board.evaluate(player1)).toBe(-1)
      })

      it('should return -1 if opponent has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player2 })
          .makeMove({ to: { x: 0, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 0, y: 2 }, byPlayer: player2 })

        expect(board.evaluate(player1)).toBe(-1)
      })

      it('should return -1 if opponent has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player2 })
          .makeMove({ to: { x: 1, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 2, y: 2 }, byPlayer: player2 })

        expect(board.evaluate(player1)).toBe(-1)
      })

      it('should return 0 if no one has 3 in a row', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 1, y: 0 }, byPlayer: player2 })
          .makeMove({ to: { x: 2, y: 0 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(0)
      })

      it('should return 0 if no one has 3 in a column', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 0, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 0, y: 2 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(0)
      })

      it('should return 0 if no one has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 1, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 2, y: 2 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(0)
      })

      it('should return 0 if the board is full', () => {
        const board = new TicTacToeBoard(players, player1)
          .makeMove({ to: { x: 0, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 0, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 0, y: 2 }, byPlayer: player1 })

          .makeMove({ to: { x: 1, y: 1 }, byPlayer: player2 })
          .makeMove({ to: { x: 1, y: 0 }, byPlayer: player1 })
          .makeMove({ to: { x: 2, y: 0 }, byPlayer: player2 })

          .makeMove({ to: { x: 1, y: 2 }, byPlayer: player1 })
          .makeMove({ to: { x: 2, y: 2 }, byPlayer: player2 })
          .makeMove({ to: { x: 2, y: 1 }, byPlayer: player1 })

        expect(board.evaluate(player1)).toBe(0)
      })

      it('should return 0 if the board is empty', () => {
        const board = new TicTacToeBoard(players, player1)

        expect(board.evaluate(player1)).toBe(0)
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

      const { move: move1 } = minimax(board.clone(), player1, maxDepth, 0)
      expect(move1).toEqual({ to: { x: 1, y: 1 }, byPlayer: player1 })

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
        [' ', 'x', ' '],
        [' ', ' ', ' '],
      ])

      // next turn
      const { move: move2 } = minimax(board.clone(), player2, maxDepth, 0)
      expect(move2).toEqual({ to: { x: 0, y: 1 }, byPlayer: player2 })

      board.makeMove(move2 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        ['o', 'x', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move3 } = minimax(board.clone(), player1, maxDepth, 0)
      expect(move3).toEqual({ to: { x: 0, y: 0 }, byPlayer: player1 })

      board.makeMove(move3 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', ' ', ' '],
        ['o', 'x', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move4 } = minimax(board.clone(), player2, maxDepth, 0)
      expect(move4).toEqual({ to: { x: 1, y: 0 }, byPlayer: player2 })

      board.makeMove(move4 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', ' '],
        ['o', 'x', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move5 } = minimax(board.clone(), player1, maxDepth, 0)
      expect(move5).toEqual({ to: { x: 2, y: 0 }, byPlayer: player1 })

      board.makeMove(move5 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move6 } = minimax(board.clone(), player2, maxDepth, 0)
      expect(move6).toEqual({ to: { x: 2, y: 1 }, byPlayer: player2 })

      board.makeMove(move6 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        [' ', ' ', ' '],
      ])

      const { move: move7 } = minimax(board.clone(), player1, maxDepth, 0)
      expect(move7).toEqual({ to: { x: 0, y: 2 }, byPlayer: player1 })

      board.makeMove(move7 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['x', ' ', ' '],
      ])

      const { move: move8 } = minimax(board.clone(), player2, maxDepth, 0)
      expect(move8).toEqual({ to: { x: 1, y: 2 }, byPlayer: player2 })

      board.makeMove(move8 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.getState()).toStrictEqual<string[][]>([
        ['x', 'o', 'x'],
        ['o', 'x', 'o'],
        ['x', 'o', ' '],
      ])

      const { move: move9 } = minimax(board.clone(), player1, maxDepth, 0)
      expect(move9).toEqual({ to: { x: 2, y: 2 }, byPlayer: player1 })

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
