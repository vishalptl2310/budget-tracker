import styled from "@emotion/styled";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import DisplayBalance from "../components/DisplayBalance";
import RecentTransactions from "../components/RecentTransactions";
import { addBalance, addExpense } from "../store/actions/expenseTracker";
import { connect, useDispatch } from "react-redux";
import AddValueModel from '../components/Models/AddValueModel'
import { addRecentTrasaction } from "../store/actions/recentTransactionsActions";
import AlertMessageComponent from "../components/alertMessage";

const PaperWrapper = styled(Paper)({
  width: "100%",
  backgroundColor: "white",
  textAlign: "center",
  padding: 20,
  maxWidth: "800px",
  margin:'20px 0' 
});

const BudgetTrackerPlus = ({ balance }) => {
  const [isOpenAmountModel, setIsOpenAmountModel] = useState(false);
  const [isOpenExpenseModel, setIsOpenExpenseModel] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertMsg) {
      setTimeout(() => {
        setAlertMsg("");
      }, 3000);
    }
  }, [alertMsg]);

  const handleSubmitAmountModel = useCallback((obj) => {
    dispatch(addBalance(obj.amount));
    dispatch(addRecentTrasaction({ isExpense: false, description: obj.description, amount: obj.amount }));
    setAlertMsg("Amount has been added!");
    setIsOpenAmountModel(false);
  }, [dispatch]);

  const handleSubmitExpenseModel = useCallback((obj) => {
    const hasSufficientBalance = (balance - obj.amount) >= 0;
    if (hasSufficientBalance) {
      dispatch(addExpense(obj.amount));
      dispatch(addRecentTrasaction({ isExpense: true, description: obj.description, amount: obj.amount }));
      setAlertMsg("Expense has been added!");
    } else {
      setAlertMsg("Insufficient Balance!");
    }
    setIsOpenExpenseModel(false);
  }, [balance, dispatch]);

  const handleOpenAmountModel = useCallback(() => {
    setIsOpenAmountModel(true);
  }, []);

  const handleOpenExpenseModel = useCallback(() => {
    setIsOpenExpenseModel(true);
  }, []);

  const memoizedAlertMessageComponent = useMemo(() => {
    return alertMsg && <AlertMessageComponent message={alertMsg} />;
  }, [alertMsg]);

  return (
    <>
      {memoizedAlertMessageComponent}
      <AddValueModel isOpen={isOpenAmountModel} setIsOpen={setIsOpenAmountModel} buttonLabel={'Add amount'} handleSubmit={handleSubmitAmountModel} />
      <AddValueModel isOpen={isOpenExpenseModel} setIsOpen={setIsOpenExpenseModel} buttonLabel={'Add Expense'} handleSubmit={handleSubmitExpenseModel} />
      <PaperWrapper>
        <Typography variant="h4">Expense Tracker</Typography>
        <DisplayBalance />
        <ButtonGroup sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" sx={{ mt: "15px", height: 50 }} onClick={handleOpenAmountModel}>
            Add amount
          </Button>
          <Button variant="contained" sx={{ mt: "15px", height: 50 }} onClick={handleOpenExpenseModel}>
            Add Expense
          </Button>
        </ButtonGroup>
        <RecentTransactions />
      </PaperWrapper>
    </>
  );
};

const mapStoreStateToProps = ({ expenseTracker }) => {
  return { ...expenseTracker };
};

export default connect(mapStoreStateToProps)(BudgetTrackerPlus);
