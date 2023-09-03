import { ITableEntry } from './transposition-table.h'

export class TranspositionTable {
  private readonly entries: ITableEntry[] = []

  constructor(private readonly tableSize: number) {}

  public getEntry(hashValue: number): ITableEntry | null {
    const index = this.mod(hashValue, this.tableSize)
    console.log('getEntry', index)
    const entry = this.entries[index]
    console.log('entry', entry)
    if (entry && entry.hashValue === hashValue) {
      return entry
    }

    return null
  }

  public setEntry(entry: ITableEntry): void {
    const index = this.mod(entry.hashValue, this.tableSize)
    console.log('setEntry', index)
    this.entries[index] = entry
  }

  private mod(n: number, d: number): number {
    return ((n % d) + d) % d
  }
}
