export const expenseTrackerActions = {
  ADD_BALANCE: "ADD_BALANCE",
  ADD_EXPENSE: "ADD_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
};

export const addBalance = (balance) => {
  return { type: expenseTrackerActions.ADD_BALANCE, payload: balance };
};

export const addExpense = (expense) => {
  return { type: expenseTrackerActions.ADD_EXPENSE, payload: expense };
};

export const updateExpense = (expense) => {
  return { type: expenseTrackerActions.UPDATE_EXPENSE, payload: expense };
};

