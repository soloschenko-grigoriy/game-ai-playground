import { ITableEntry } from './memory-enhanced-test.h'

export class TranspositionTable {
  private readonly entries: ITableEntry[] = []

  constructor(private readonly tableSize: number) {}

  public getEntry(hashValue: number): ITableEntry | null {
    const index = this.mod(hashValue, this.tableSize)
    const entry = this.entries[index]
    if (entry && entry.hashValue === hashValue) {
      return entry
    }

    return null
  }

  public storeEntry(entry: ITableEntry): void {
    const index = this.mod(entry.hashValue, this.tableSize)
    this.entries[index] = entry
  }

  public getLatest(): ITableEntry | null {
    return this.entries[this.entries.length - 1] || null
  }

  private mod(n: number, d: number): number {
    return ((n % d) + d) % d
  }
}
