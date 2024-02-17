import { expenseTrackerActions } from "../actions/expenseTracker";

const initState = {
  expense: 0, 
  balance: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case expenseTrackerActions.ADD_BALANCE:
      return {...state, balance: state.balance + +action.payload}
    case expenseTrackerActions.ADD_EXPENSE:
        return {expense: state.expense + parseInt(action.payload), balance: state.balance - parseInt(action.payload)}
    case expenseTrackerActions.UPDATE_EXPENSE:
        return {expense: state.expense + parseInt(action.payload), balance: state.balance - parseInt(action.payload)}
        default:
      return state;
  }
};

export default reducer;
