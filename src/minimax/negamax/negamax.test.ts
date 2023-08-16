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

    describe('gameOver', () => {
      it('should return true if player has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', 'x', 'x'],
          [' ', 'o', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', ' ', ' '],
          ['x', 'o', ' '],
          ['x', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', 'x'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if player has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          [' ', ' ', 'x'],
          [' ', 'x', ' '],
          ['x', ' ', ' '],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a row', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', ' ', 'x'],
          [' ', ' ', ' '],
          ['o', 'o', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a column', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', 'o', ' '],
          [' ', 'o', ' '],
          ['x', 'o', ' '],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['o', ' ', ' '],
          ['x', 'o', ' '],
          [' ', ' ', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if opponent has 3 in a secondary diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          [' ', ' ', 'o'],
          [' ', 'o', ' '],
          ['o', ' ', 'x'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return true if the board is full', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', 'x', 'o'],
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
        ])

        expect(board.isGameOver()).toBeTruthy()
      })

      it('should return false if the board is empty', () => {
        const board = new TicTacToeBoard(player1, player2, player1)

        expect(board.isGameOver()).toBeFalsy()
      })

      it('should return false if the board is not full and no one has 3 in a row nor in a column nor in diagonal', () => {
        const board = new TicTacToeBoard(player1, player2, player1, [
          ['x', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        expect(board.isGameOver()).toBeFalsy()
      })
    })

    describe('makeMove', () => {
      it('should update the board if move is valid', () => {
        const board = new TicTacToeBoard(player1, player2, player1)

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
        const board = new TicTacToeBoard(player1, player2, player1, [
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

    describe('evaluation function improved', () => {
      describe('calcRows', () => {
        it('should return the number of times the player has 2 in a row', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            ['x', 'x', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcRows(player1).x2).toBe(1)
          expect(board1.calcRows(player1).x1).toBe(0)
          expect(board1.calcRows(player1).o2).toBe(0)
          expect(board1.calcRows(player1).o1).toBe(0)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            ['x', 'x', ' '],
            ['x', ' ', 'x'],
            [' ', ' ', ' '],
          ])

          expect(board2.calcRows(player1).x2).toBe(2)
          expect(board2.calcRows(player1).x1).toBe(0)
          expect(board2.calcRows(player1).o2).toBe(0)
          expect(board2.calcRows(player1).o1).toBe(0)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            ['x', 'x', ' '],
            ['x', ' ', 'x'],
            [' ', 'x', 'x'],
          ])

          expect(board3.calcRows(player1).x2).toBe(3)
          expect(board3.calcRows(player1).x1).toBe(0)
          expect(board3.calcRows(player1).o2).toBe(0)
          expect(board3.calcRows(player1).o1).toBe(0)
        })

        it('should return the number of times the player has 1 in a row', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcRows(player1).x2).toBe(0)
          expect(board1.calcRows(player1).x1).toBe(1)
          expect(board1.calcRows(player1).o2).toBe(0)
          expect(board1.calcRows(player1).o1).toBe(0)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            ['x', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board2.calcRows(player1).x2).toBe(0)
          expect(board2.calcRows(player1).x1).toBe(2)
          expect(board2.calcRows(player1).o2).toBe(0)
          expect(board2.calcRows(player1).o1).toBe(0)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            ['x', ' ', ' '],
            [' ', ' ', 'x'],
          ])

          expect(board3.calcRows(player1).x2).toBe(0)
          expect(board3.calcRows(player1).x1).toBe(3)
          expect(board3.calcRows(player1).o2).toBe(0)
          expect(board3.calcRows(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 2 in a row', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', 'o'],
            [' ', ' ', ' '],
          ])

          expect(board1.calcRows(player1).x2).toBe(0)
          expect(board1.calcRows(player1).x1).toBe(0)
          expect(board1.calcRows(player1).o2).toBe(1)
          expect(board1.calcRows(player1).o1).toBe(0)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            ['o', ' ', 'o'],
            [' ', 'o', 'o'],
            [' ', ' ', ' '],
          ])

          expect(board2.calcRows(player1).x2).toBe(0)
          expect(board2.calcRows(player1).x1).toBe(0)
          expect(board2.calcRows(player1).o2).toBe(2)
          expect(board2.calcRows(player1).o1).toBe(0)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            ['o', 'o', ' '],
            [' ', 'o', 'o'],
            ['o', ' ', 'o'],
          ])

          expect(board3.calcRows(player1).x2).toBe(0)
          expect(board3.calcRows(player1).x1).toBe(0)
          expect(board3.calcRows(player1).o2).toBe(3)
          expect(board3.calcRows(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 1 in a row', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcRows(player1).x2).toBe(0)
          expect(board1.calcRows(player1).x1).toBe(0)
          expect(board1.calcRows(player1).o2).toBe(0)
          expect(board1.calcRows(player1).o1).toBe(1)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', 'o'],
            [' ', 'o', ' '],
            [' ', ' ', ' '],
          ])

          expect(board2.calcRows(player1).x2).toBe(0)
          expect(board2.calcRows(player1).x1).toBe(0)
          expect(board2.calcRows(player1).o2).toBe(0)
          expect(board2.calcRows(player1).o1).toBe(2)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            ['o', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', 'o'],
          ])

          expect(board3.calcRows(player1).x2).toBe(0)
          expect(board3.calcRows(player1).x1).toBe(0)
          expect(board3.calcRows(player1).o2).toBe(0)
          expect(board3.calcRows(player1).o1).toBe(3)
        })
      })

      describe('calcColumns', () => {
        it('should return the number of times the player has 2 in a column', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            ['x', ' ', ' '],
            ['x', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcColumns(player1).x2).toBe(1)
          expect(board.calcColumns(player1).x1).toBe(0)
          expect(board.calcColumns(player1).o2).toBe(0)
          expect(board.calcColumns(player1).o1).toBe(0)
        })

        it('should return the number of times the player has 1 in a column', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcColumns(player1).x2).toBe(0)
          expect(board1.calcColumns(player1).x1).toBe(1)
          expect(board1.calcColumns(player1).o2).toBe(0)
          expect(board1.calcColumns(player1).o1).toBe(0)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            ['x', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board2.calcColumns(player1).x2).toBe(0)
          expect(board2.calcColumns(player1).x1).toBe(2)
          expect(board2.calcColumns(player1).o2).toBe(0)
          expect(board2.calcColumns(player1).o1).toBe(0)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            [' ', 'x', ' '],
            [' ', ' ', 'x'],
            ['x', ' ', ' '],
          ])

          expect(board3.calcColumns(player1).x2).toBe(0)
          expect(board3.calcColumns(player1).x1).toBe(3)
          expect(board3.calcColumns(player1).o2).toBe(0)
          expect(board3.calcColumns(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 2 in a column', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', 'o', ' '],
          ])

          expect(board1.calcColumns(player1).x2).toBe(0)
          expect(board1.calcColumns(player1).x1).toBe(0)
          expect(board1.calcColumns(player1).o2).toBe(1)
          expect(board1.calcColumns(player1).o1).toBe(0)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', 'o'],
            [' ', 'o', ' '],
            [' ', 'o', 'o'],
          ])

          expect(board2.calcColumns(player1).x2).toBe(0)
          expect(board2.calcColumns(player1).x1).toBe(0)
          expect(board2.calcColumns(player1).o2).toBe(2)
          expect(board2.calcColumns(player1).o1).toBe(0)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', 'o'],
            ['o', 'o', 'o'],
            ['o', 'o', ' '],
          ])

          expect(board3.calcColumns(player1).x2).toBe(0)
          expect(board3.calcColumns(player1).x1).toBe(0)
          expect(board3.calcColumns(player1).o2).toBe(3)
          expect(board3.calcColumns(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 1 in a column', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcColumns(player1).x2).toBe(0)
          expect(board1.calcColumns(player1).x1).toBe(0)
          expect(board1.calcColumns(player1).o2).toBe(0)
          expect(board1.calcColumns(player1).o1).toBe(1)

          const board2 = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', 'o'],
            [' ', ' ', ' '],
          ])

          expect(board2.calcColumns(player1).x2).toBe(0)
          expect(board2.calcColumns(player1).x1).toBe(0)
          expect(board2.calcColumns(player1).o2).toBe(0)
          expect(board2.calcColumns(player1).o1).toBe(2)

          const board3 = new TicTacToeBoard(player1, player2, player1, [
            ['o', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', 'o'],
          ])

          expect(board3.calcColumns(player1).x2).toBe(0)
          expect(board3.calcColumns(player1).x1).toBe(0)
          expect(board3.calcColumns(player1).o2).toBe(0)
          expect(board3.calcColumns(player1).o1).toBe(3)
        })
      })

      describe('calcMainDiag', () => {
        it('should return the number of times the player has 2 in a main diagonal', () => {
          const board1 = new TicTacToeBoard(player1, player2, player1, [
            ['x', ' ', ' '],
            [' ', 'x', ' '],
            [' ', ' ', ' '],
          ])

          expect(board1.calcMainDiag(player1).x2).toBe(1)
          expect(board1.calcMainDiag(player1).x1).toBe(0)
          expect(board1.calcMainDiag(player1).o2).toBe(0)
          expect(board1.calcMainDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the player has 1 in a main diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'x', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcMainDiag(player1).x2).toBe(0)
          expect(board.calcMainDiag(player1).x1).toBe(1)
          expect(board.calcMainDiag(player1).o2).toBe(0)
          expect(board.calcMainDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 2 in a main diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', 'o'],
          ])

          expect(board.calcMainDiag(player1).x2).toBe(0)
          expect(board.calcMainDiag(player1).x1).toBe(0)
          expect(board.calcMainDiag(player1).o2).toBe(1)
          expect(board.calcMainDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 1 in a main diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcMainDiag(player1).x2).toBe(0)
          expect(board.calcMainDiag(player1).x1).toBe(0)
          expect(board.calcMainDiag(player1).o2).toBe(0)
          expect(board.calcMainDiag(player1).o1).toBe(1)
        })
      })

      describe('calcSecondaryDiag', () => {
        it('should return the number of times the player has 2 in a secondary diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', 'x'],
            [' ', 'x', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcSecondaryDiag(player1).x2).toBe(1)
          expect(board.calcSecondaryDiag(player1).x1).toBe(0)
          expect(board.calcSecondaryDiag(player1).o2).toBe(0)
          expect(board.calcSecondaryDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the player has 1 in a secondary diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'x', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcSecondaryDiag(player1).x2).toBe(0)
          expect(board.calcSecondaryDiag(player1).x1).toBe(1)
          expect(board.calcSecondaryDiag(player1).o2).toBe(0)
          expect(board.calcSecondaryDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 2 in a secondary diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            ['o', ' ', ' '],
          ])

          expect(board.calcSecondaryDiag(player1).x2).toBe(0)
          expect(board.calcSecondaryDiag(player1).x1).toBe(0)
          expect(board.calcSecondaryDiag(player1).o2).toBe(1)
          expect(board.calcSecondaryDiag(player1).o1).toBe(0)
        })

        it('should return the number of times the opponent has 1 in a secondary diagonal', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', 'o', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.calcSecondaryDiag(player1).x2).toBe(0)
          expect(board.calcSecondaryDiag(player1).x1).toBe(0)
          expect(board.calcSecondaryDiag(player1).o2).toBe(0)
          expect(board.calcSecondaryDiag(player1).o1).toBe(1)
        })
      })

      describe('evaluate', () => {
        it('should return 0 for empty board since both player and adversary have equal chances to win', () => {
          const board = new TicTacToeBoard(player1, player2, player1, [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
          ])

          expect(board.evaluate()).toBe(0)
        })

        it('should return the score of the board', () => {
          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'x', ' '],
              [' ', ' ', ' '],
            ]).evaluate(),
          ).toBe(4)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'x', ' '],
              ['x', ' ', ' '],
            ]).evaluate(),
          ).toBe(8)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', ' '],
              [' ', ' ', ' '],
            ]).evaluate(),
          ).toBe(-4)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-8)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', 'x'],
              [' ', 'x', ' '],
              ['x', ' ', ' '],
            ]).evaluate(),
          ).toBe(Infinity)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              ['o', ' ', 'x'],
              [' ', 'o', ' '],
              ['x', ' ', 'o'],
            ]).evaluate(),
          ).toBe(-Infinity)
        })

        it('should incentivize blocking opponent move', () => {
          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-8)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', 'x'],
              [' ', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-3) // this one should be of best score

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              ['x', ' ', ' '],
              [' ', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-5)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              ['x', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-6)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', 'x', ' '],
              [' ', 'o', ' '],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-6)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', ' '],
              ['o', 'x', ' '],
            ]).evaluate(),
          ).toBe(-6)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', 'x'],
              ['o', ' ', ' '],
            ]).evaluate(),
          ).toBe(-6)

          expect(
            new TicTacToeBoard(player1, player2, player1, [
              [' ', ' ', ' '],
              [' ', 'o', ' '],
              ['o', ' ', 'x'],
            ]).evaluate(),
          ).toBe(-5)
        })
      })
    })

    describe('playing', () => {
      it('should return the best score and a move', () => {
        const maxDepth = 3
        const board = new TicTacToeBoard(player1, player2, player1)

        // board is empty and the beginning
        expect(board.nodes).toStrictEqual<string[][]>([
          [' ', ' ', ' '],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ])

        const { move: move1, score: score1 } = negamax(board.clone(), maxDepth, 0)
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
        const { move: move2, score: score2 } = negamax(board.clone(), maxDepth, 0)
        expect(move2).toEqual({ x: 0, y: 0 })
        expect(score2).toBe(-0)

        board.makeMove(move2 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', ' ', ' '],
          [' ', 'x', ' '],
          [' ', ' ', ' '],
        ])

        const { move: move3, score: score3 } = negamax(board.clone(), maxDepth, 0)
        expect(move3).toEqual({ x: 1, y: 2 })
        expect(score3).toBe(5)

        board.makeMove(move3 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', ' ', ' '],
          [' ', 'x', ' '],
          [' ', 'x', ' '],
        ])

        const { move: move4, score: score4 } = negamax(board.clone(), maxDepth, 0)
        expect(move4).toEqual({ x: 1, y: 0 })
        expect(score4).toBe(1)

        board.makeMove(move4 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', 'o', ' '],
          [' ', 'x', ' '],
          [' ', 'x', ' '],
        ])

        const { move: move5, score: score5 } = negamax(board.clone(), maxDepth, 0)
        expect(move5).toEqual({ x: 2, y: 0 })
        expect(score5).toBe(4)

        board.makeMove(move5 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', 'o', 'x'],
          [' ', 'x', ' '],
          [' ', 'x', ' '],
        ])

        const { move: move6, score: score6 } = negamax(board.clone(), maxDepth, 0)
        expect(move6).toEqual({ x: 0, y: 2 })
        expect(score6).toBe(-0)

        board.makeMove(move6 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', 'o', 'x'],
          [' ', 'x', ' '],
          ['o', 'x', ' '],
        ])

        const { move: move7, score: score7 } = negamax(board.clone(), maxDepth, 0)
        expect(move7).toEqual({ x: 0, y: 1 })
        expect(score7).toBe(-0)

        board.makeMove(move7 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', 'o', 'x'],
          ['x', 'x', ' '],
          ['o', 'x', ' '],
        ])

        const { move: move8, score: score8 } = negamax(board.clone(), maxDepth, 0)
        expect(move8).toEqual({ x: 2, y: 1 })
        expect(score8).toBe(0)

        board.makeMove(move8 as ITicTacToeMove)
        expect(board.isGameOver()).toBe(false)
        expect(board.nodes).toStrictEqual<string[][]>([
          ['o', 'o', 'x'],
          ['x', 'x', 'o'],
          ['o', 'x', ' '],
        ])

        const { move: move9, score: score9 } = negamax(board.clone(), maxDepth, 0)
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

        while (board.isGameOver() === false) {
          const { move, score } = negamax(board.clone(), maxDepth, 0)
          board.makeMove(move as ITicTacToeMove)
          console.log(score)
          console.log(board.toString())
        }
      })
    })
  })
})
