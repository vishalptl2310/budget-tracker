export const recentTractionsActions = {
  ADD_RECENT_TRANSACTIONS: "ADD_RECENT_TRANSACTIONS",
  UPDATE_RECENT_TRANSACTIONS: 'UPDATE_RECENT_TRANSACTIONS'
};

export const addRecentTrasaction = (data) => {
  return {
    type: recentTractionsActions.ADD_RECENT_TRANSACTIONS,
    payload: data,
  };
};

export const updateRecentTrasaction = (data) => {
  return {
    type: recentTractionsActions.UPDATE_RECENT_TRANSACTIONS,
    payload: data,
  };
};

