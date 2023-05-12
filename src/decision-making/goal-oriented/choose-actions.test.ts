import { IAction } from './action.h'
import { chooseAction } from './choose-actions'
import { IGoal } from './goal.h'

describe('choose-actions', () => {
  it('should return action with the best utility', () => {
    const eatActions: IAction[] = [
      {
        name: 'Eat Raw food',
        getGoalChange: (goal: IGoal) => goal.value - 3,
      },
      {
        name: 'Get snack',
        getGoalChange: (goal: IGoal) => goal.value - 2,
      },
    ]

    const sleepActions: IAction[] = [
      {
        name: 'Sleep in bed',
        getGoalChange: (goal: IGoal) => goal.value - 4,
      },
      {
        name: 'Sleep on sofa',
        getGoalChange: (goal: IGoal) => goal.value - 2,
      },
    ]

    const eat = {
      name: 'Eat',
      value: 4,
      actions: eatActions,
    }

    const sleep = {
      name: 'Sleep',
      value: 3,
      actions: sleepActions,
    }

    expect(chooseAction([eat, sleep]).name).toBe('Eat Raw food')
  })
})
