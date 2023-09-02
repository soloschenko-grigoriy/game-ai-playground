// generate random int from 0 to 2^64

export class ZobristKeyTiCTacToe {
  private readonly table: number[] = []

  public get Table() {
    return this.table
  }

  constructor() {
    this.init()
  }

  private init(): void {
    // there are 9 cells, each cell has 2 possible values
    for (var i = 0; i < 9 * 2; i++) {
      this.table[i] = this.randomInt64()
    }
  }

  public calcHash(board: string[][]): number {
    let hash = 0

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        this.updateHash(board, hash, x, y)
      }
    }

    return hash
  }

  public updateHash(board: string[][], hash: number, x: number, y: number): number {
    if (board[x][y].trim()) {
      if (board[x][y] === 'x') {
        hash ^= this.table[y * 3 + x]
      } else {
        hash ^= this.table[y * 3 + x + 9]
      }
    }

    return hash
  }

  private randomInt64(): number {
    return Math.floor(Math.random() * 2 ** 64)
  }
}
