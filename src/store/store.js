import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore } from "redux";
import expenseTrackerReducer from "./reducers/expenseTrackerReducer";
import recentTransactionsReducer from "./reducers/recentTransactionsReducer";

const rootReducer = combineReducers({
  expenseTracker: expenseTrackerReducer,
  recentTransactions: recentTransactionsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;
