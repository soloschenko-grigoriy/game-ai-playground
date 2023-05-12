import { IGoal } from './goal.h'

export interface IAction {
  name: string
  getGoalChange(goal: IGoal): number
}

// export class Action {
//   public get Name(): string {
//     return this._name
//   }

//   constructor(private readonly _name: string, private readonly _goal: IGoal) {}

//   public getGoalChange(): number {
//     return this._goal.value - 1
//   }
// }
