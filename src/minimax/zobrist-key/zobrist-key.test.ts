import { ZobristKeyTiCTacToe } from './zobrist-key'

describe('ZobristKey', () => {
  it('should calculate hash for an empty board', () => {
    const zobristKey = new ZobristKeyTiCTacToe()
    const board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]
    const hash = zobristKey.calcHash(board)
    expect(hash).toBe(0)
  })

  it('should be incremental', () => {
    const zobristKey = new ZobristKeyTiCTacToe()
    console.log(zobristKey.Table)
    const board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]
    const hash = zobristKey.calcHash(board)
    console.log(hash)

    const board1 = [
      [' ', ' ', ' '],
      [' ', 'x', ' '],
      [' ', ' ', ' '],
    ]
    const firstMoveHash = zobristKey.updateHash(board1, hash, 1, 1)
    console.log(firstMoveHash)

    const board2 = [
      [' ', ' ', ' '],
      [' ', 'x', 'x'],
      [' ', ' ', ' '],
    ]

    const secondMoveHash = zobristKey.updateHash(board2, firstMoveHash, 1, 1)
    console.log(secondMoveHash)

    const board2Reversed = [
      [' ', ' ', ' '],
      [' ', 'x', ' '],
      [' ', ' ', ' '],
    ]

    const reversedSecondMoveHash = zobristKey.updateHash(board2Reversed, secondMoveHash, 1, 1)
    console.log(reversedSecondMoveHash)

    expect(reversedSecondMoveHash).toBe(firstMoveHash)
  })
})
