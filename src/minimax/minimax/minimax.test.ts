import { ITicTacToePlayer, TicTacToeBoard } from './example'
import { minimax } from './minimax'

describe('minimax', () => {
  describe('in tic-tac-toe', () => {
    const player1: ITicTacToePlayer = {
      id: 1,
    }

    const player2: ITicTacToePlayer = {
      id: 2,
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

      const { score, move } = minimax(new TicTacToeBoard([player1, player2], player1), player1, maxDepth, 0)

      // expect(score).toBe(3)
      expect(move).toEqual({ to: { x: 0, y: 0 }, byPlayer: player1 })
    })
  })
})
