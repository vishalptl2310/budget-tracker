import { Box, Divider, Typography} from "@mui/material";
import React from "react";
import { connect } from "react-redux";


const DisplayBalance = ({balance, expense}) => {

  return (
    <Box
      sx={{
        height: "180px",
        width: "100%",
        border: "1px solid black",
        marginTop: "15px",
        display: "flex",
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Typography variant="h4">Balance</Typography>
        <Typography variant="h4">{`$ ${balance}`}</Typography>
      </Box>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Box sx={{ width: "50%" }}>
        <Typography variant="h4">Expense</Typography>
        <Typography variant="h4">{`$ ${expense}`}</Typography>
      </Box>
    </Box>
  );
};
const mapStoreStateToProps = ({expenseTracker})=>{
  return {...expenseTracker}
}

export default connect(mapStoreStateToProps)(DisplayBalance);
