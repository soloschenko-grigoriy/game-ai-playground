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

    describe('evaluation function', () => {
      it('should return 100 if player has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'x', 'x'],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(100)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['x', 'x', 'x'],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])
      })

      it('should return 100 if player has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          ['x', ' ', ' '],
          ['x', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(100)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['x', ' ', ' '],
          ['x', ' ', ' '],
          ['x', ' ', ' '],
        ])
      })

      it('should return 100 if player has 3 in a main diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', 'x'],
        ])

        expect(board.evaluate()).toBe(100)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['x', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', 'x'],
        ])
      })

      it('should return 100 if player has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', 'x'],
          [' ', 'x', ' '],
          ['x', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(100)
        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', 'x'],
          [' ', 'x', ' '],
          ['x', ' ', ' '],
        ])
      })

      it('should return 10 if player has 2 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'x', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(10)
      })

      it('should return 10 if player has 2 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          ['x', ' ', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(10)
      })

      it('should return 10 if player has 2 in a main diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(10)
      })

      it('should return 10 if player has 2 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', 'x'],
          [' ', 'x', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(10)
      })

      it('should return -100 if opponent has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', ' '],
          ['o', 'o', 'o'],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(-100)
        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          ['o', 'o', 'o'],
          [' ', ' ', ' '],
        ])
      })

      it('should return -100 if opponent has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', 'o', ' '],
          [' ', 'o', ' '],
          [' ', 'o', ' '],
        ])

        expect(board.evaluate()).toBe(-100)
        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', 'o', ' '],
          [' ', 'o', ' '],
          [' ', 'o', ' '],
        ])
      })

      it('should return -100 if opponent has 3 in a main diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['o', ' ', ' '],
          [' ', 'o', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.evaluate()).toBe(-100)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', ' ', ' '],
          [' ', 'o', ' '],
          [' ', ' ', 'o'],
        ])
      })

      it('should return -100 if opponent has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', 'o'],
          [' ', 'o', ' '],
          ['o', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(-100)
        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', 'o'],
          [' ', 'o', ' '],
          ['o', ' ', ' '],
        ])
      })

      it('should return -10 if opponent has 2 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', ' '],
          ['o', 'o', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(-10)
      })

      it('should return -10 if opponent has 2 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', 'o', ' '],
          [' ', ' ', ' '],
          [' ', 'o', ' '],
        ])

        expect(board.evaluate()).toBe(-10)
      })

      it('should return -10 if opponent has 2 in a main diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['o', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.evaluate()).toBe(-10)
      })

      it('should return -10 if opponent has 2 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', ' '],
          [' ', 'o', ' '],
          ['o', ' ', ' '],
        ])

        expect(board.evaluate()).toBe(-10)
      })

      it('should return 90 (100 - 10) if player has 3 in a row and opponent has 2 in a row ', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'o', ' '],
          ['x', 'o', ' '],
          ['x', ' ', ' '],
        ])
        // .makeMove({ x: 0, y: 0 })
        // .makeMove({ x: 1, y: 0 })
        // .makeMove({ x: 2, y: 0 })

        // .makeMove({ x: 1, y: 1 })
        // .makeMove({ x: 0, y: 1 })
        // .makeMove({ x: 2, y: 1 })

        // .makeMove({ x: 0, y: 2 })
        expect(board.currentPlayer()).toBe(player1)
        expect(board.evaluate()).toBe(90)
      })

      it('should return 100 (100 + 10 - 10) if player has 3 and 2 in a row and opponent has 2 in a row ', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', 'x'],
          ['x', ' ', ' '],
          ['x', ' ', ' '],
        ])
        expect(board.currentPlayer()).toBe(player1)
        expect(board.evaluate()).toBe(120)
      })
    })

    describe('gameOver', () => {
      it('should return true if player has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'x', 'x'],
          [' ', 'o', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          ['x', 'o', ' '],
          ['x', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', 'x'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', 'x'],
          [' ', 'x', ' '],
          ['x', ' ', ' '],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', 'x'],
          [' ', ' ', ' '],
          ['o', 'o', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'o', ' '],
          [' ', 'o', ' '],
          ['x', 'o', ' '],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['o', ' ', ' '],
          ['x', 'o', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', 'o'],
          [' ', 'o', ' '],
          ['o', ' ', 'x'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if the board is full', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', 'x', 'o'],
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return false if the board is empty', () => {
        const board = new TicTacToeBoard(player1, player2)

        expect(board.isGameOver()).toBeFalsy()
      })

      it('should return false if the board is not full and no one has 3 in a row nor in a column nor in diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, [
          ['x', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.isGameOver()).toBeFalsy()
      })
    })

    describe('makeMove', () => {
      it('should update the board if move is valid', () => {
        const board = new TicTacToeBoard(player1, player2)

        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        board.makeMove({ x: 1, y: 2 })

        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', 'x', ' '],
        ])
      })

      it('should throw an error if move is invalid', () => {
        const board = new TicTacToeBoard(player1, player2, [
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', 'x', ' '],
        ])

        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', 'x', ' '],
        ])

        expect(() => board.makeMove({ x: 1, y: 2 })).toThrowError('Invalid move')
      })
    })

    it('should return the best score and a move', () => {
      const maxDepth = 3
      const board = new TicTacToeBoard(player1, player2)

      // board is empty and the beginning
      expect(board.nodes).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ])

      const { move: move1, score: score1 } = negamax(board.clone(), maxDepth, 0)
      expect(move1).toEqual({ x: 1, y: 2 })
      expect(score1).toBe(220)

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
        [' ', ' ', ' '],
        [' ', 'x', ' '],
      ])

      // next turn
      const { move: move2, score: score2 } = negamax(board.clone(), maxDepth, 0)
      expect(move2).toEqual({ x: 2, y: 2 })
      expect(score2).toBe(-40)

      board.makeMove(move2 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', 'x', 'o'],
      ])

      const { move: move3, score: score3 } = negamax(board.clone(), maxDepth, 0)
      expect(move3).toEqual({ x: 2, y: 0 })
      expect(score3).toBe(40)

      board.makeMove(move3 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        [' ', ' ', 'x'],
        [' ', ' ', ' '],
        [' ', 'x', 'o'],
      ])

      const { move: move4, score: score4 } = negamax(board.clone(), maxDepth, 0)
      expect(move4).toEqual({ x: 2, y: 1 })
      expect(score4).toBe(-130)

      board.makeMove(move4 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        [' ', ' ', 'x'],
        [' ', ' ', 'o'],
        [' ', 'x', 'o'],
      ])

      const { move: move5, score: score5 } = negamax(board.clone(), maxDepth, 0)
      expect(move5).toEqual({ x: 0, y: 1 })
      expect(score5).toBe(130)

      board.makeMove(move5 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        [' ', ' ', 'x'],
        ['x', ' ', 'o'],
        [' ', 'x', 'o'],
      ])

      const { move: move6, score: score6 } = negamax(board.clone(), maxDepth, 0)
      expect(move6).toEqual({ x: 0, y: 0 })
      expect(score6).toBe(240)

      board.makeMove(move6 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        ['o', ' ', 'x'],
        ['x', ' ', 'o'],
        [' ', 'x', 'o'],
      ])

      const { move: move7, score: score7 } = negamax(board.clone(), maxDepth, 0)
      expect(move7).toEqual({ x: 1, y: 0 })
      expect(score7).toBe(110)

      board.makeMove(move7 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        ['o', 'x', 'x'],
        ['x', ' ', 'o'],
        [' ', 'x', 'o'],
      ])

      const { move: move8, score: score8 } = negamax(board.clone(), maxDepth, 0)
      expect(move8).toEqual({ x: 0, y: 2 })
      expect(score8).toBe(220)

      board.makeMove(move8 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(false)
      expect(board.nodes).toStrictEqual<string[][]>([
        ['o', 'x', 'x'],
        ['x', ' ', 'o'],
        ['o', 'x', 'o'],
      ])

      const { move: move9, score: score9 } = negamax(board.clone(), maxDepth, 0)
      expect(move9).toEqual({ x: 1, y: 1 })
      expect(score9).toBe(-90)

      board.makeMove(move9 as ITicTacToeMove)
      expect(board.isGameOver()).toBe(true)
      expect(board.nodes).toStrictEqual<string[][]>([
        ['o', 'x', 'x'],
        ['x', 'x', 'o'],
        ['o', 'x', 'o'],
      ])
    })
  })
})
