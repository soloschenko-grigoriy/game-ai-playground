import { IAction } from './action.h'

export interface IGoal {
  name: string
  value: number
  actions: IAction[]
}
