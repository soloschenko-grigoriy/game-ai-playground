import { IAction } from './action.h'
import { IGoal } from './goal.h'

export const chooseAction = (goals: IGoal[]): IAction => {
  let topGoal = goals[0]
  for (let goal of goals) {
    if (goal.value > topGoal.value) {
      topGoal = goal
    }
  }

  let bestAction = topGoal.actions[0]
  let bestUtility = -topGoal.actions[0].getGoalChange(topGoal)

  for (let action of topGoal.actions) {
    const utility = -action.getGoalChange(topGoal)

    if (utility > bestUtility) {
      bestUtility = utility
      bestAction = action
    }
  }

  return bestAction
}
