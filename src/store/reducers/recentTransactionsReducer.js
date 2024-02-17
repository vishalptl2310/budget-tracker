import { recentTractionsActions } from "../actions/recentTransactionsActions";

//isExpense: description .amount
const initState = [];

const reducer = (state = initState, action) => {
  switch (action.type) {
    case recentTractionsActions.ADD_RECENT_TRANSACTIONS:
        const obj = action.payload
        const newObj = {isExpense: obj.isExpense,  description:obj.description, amount : obj.amount}
      return [newObj, ...state]
    case recentTractionsActions.UPDATE_RECENT_TRANSACTIONS:
        const newValues = action.payload
        const finalObj = {isExpense: true,  description:newValues.description, amount : newValues.amount}
        const curState = [...state];
        curState[newValues.index] = finalObj
        return curState;
    default:
      return state;
  }
};

export default reducer;
