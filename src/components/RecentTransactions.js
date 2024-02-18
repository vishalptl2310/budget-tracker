import { Box, Typography} from "@mui/material";
import React, { useState } from "react";
import TransactionItem from "./TransactionItem";
import styled from "@emotion/styled";
import { connect} from "react-redux";
import EditValueModel from "./Models/EditValueModel";
import NoTransactions from "./NoTransactions";

const Wrapper = styled(Box)({
  margin: "25px 0px",
});
const RecentTransactions = ({ recentTransactions }) => {
  const [objToEdit, setObjToEdit] = useState({});
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  return (
    <>
    <EditValueModel isOpen={isOpenEditModel} setIsOpen={setIsOpenEditModel} currentValues={objToEdit}/>
    <Wrapper>
      <Typography variant="h4">Recent Transactions</Typography>
      <Box sx={{ overflow: "auto", height: 400}}>
        {recentTransactions.map((item, i) => {
          return (
            <TransactionItem
              key={i}
              isExpense={item.isExpense}
              index={i}
              description={item.description}
              amount={item.amount}
              setObjToEdit={setObjToEdit}
              setIsOpenEditModel={setIsOpenEditModel}
              />
              );
            })}
        {recentTransactions.length === 0 && (
          <NoTransactions/>
          )}
      </Box>
    </Wrapper>
</>
  );
};

const mapStoreStateToProps = ({ recentTransactions }) => {
  return { recentTransactions: [...recentTransactions] };
};
export default connect(mapStoreStateToProps)(RecentTransactions);
