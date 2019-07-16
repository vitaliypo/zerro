import selectors from './selectors'
import getAllBudgets from './budgetViewSelector'
import slice from './slice'
import thunks from './thunks'

// REDUCER
export default slice.reducer

// ACTIONS
export const { setBudget } = slice.actions

// SELECTORS
export const {
  getBudgetsToSave,
  getBudgetsToSync,
  getBudgetsByMonthAndTag,
  getBudget,
} = selectors
export { getAllBudgets }

// THUNKS
export const { setOutcomeBudget } = thunks