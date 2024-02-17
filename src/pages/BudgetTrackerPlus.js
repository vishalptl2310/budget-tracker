import styled from "@emotion/styled";
import {  Button, ButtonGroup, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const BudgetTrackerPlus = ({balance}) => {
  const [isOpenAmoutModel, setIsOpneAmountModel] = useState(false);
  const [isOpenExpenseModel, setIsOpneExpenseModel] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(alertMsg){
      setTimeout(()=>{
      setAlertMsg("")
      }, 3000)
    }
  }, [alertMsg])

  const handleSubmitAmountModel = (obj)=>{
    dispatch(addBalance(obj.amount))
    dispatch(addRecentTrasaction({isExpense: false,  description:obj.description, amount : obj.amount}))
    setAlertMsg("Amount has been added!")
    setIsOpneAmountModel(false)
  }

  const handleSubmitExpenseModel = (obj)=>{
    const hasSuffientBalance = (balance - obj.amount)>=0
    if(hasSuffientBalance){
      dispatch(addExpense(obj.amount))
      dispatch(addRecentTrasaction({isExpense: true,  description:obj.description, amount : obj.amount}))
      setAlertMsg("Expense has been added!")
    }
    else{
      setAlertMsg("Insufficient Balance!")
    }
    setIsOpneExpenseModel(false)
  }
  return (
    <>
    {alertMsg && <AlertMessageComponent message= {alertMsg}/>}
    <AddValueModel isOpen={isOpenAmoutModel} setIsOpen={setIsOpneAmountModel} buttonLabel={'Add amount'} handleSubmit={handleSubmitAmountModel}/>
    <AddValueModel isOpen={isOpenExpenseModel} setIsOpen={setIsOpneExpenseModel} buttonLabel={'Add Expense'} handleSubmit={handleSubmitExpenseModel}/>
      <PaperWrapper>
        <Typography variant="h4">Expense Tracker</Typography>
        <DisplayBalance />
        <ButtonGroup sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" sx={{ mt: "15px", height: 50 }} onClick={()=>setIsOpneAmountModel(true)}>
            Add amount
          </Button>
          <Button variant="contained" sx={{ mt: "15px", height: 50 }} onClick={()=>setIsOpneExpenseModel(true)}>
            Add Expense
          </Button>
        </ButtonGroup>
        <RecentTransactions />
      </PaperWrapper>
    </>
  );
};
const mapStoreStateToProps = ({expenseTracker})=>{
  return {...expenseTracker}
}

export default connect(mapStoreStateToProps)(BudgetTrackerPlus);
