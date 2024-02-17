import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import EjectIcon from "@mui/icons-material/Eject";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TransactionItem = ({
  isExpense,
  description,
  amount,
  setObjToEdit,
  index,
  setIsOpenEditModel,
}) => {
  return (
    <Box sx={{ padding: "15px" }}>
      <Button
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
          width: "100%",
        }}
        onClick={() => {
          setObjToEdit({ isExpense, description, amount, index });
          if(isExpense)setIsOpenEditModel(true);
        }}
      >
        <Box display={"flex"} sx={{alignItems:'center'}}>
          <IconButton sx={{ mx: "20px" }}>
            {isExpense ? <EjectIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Typography variant="h6">{description}</Typography>
        </Box>
        <Box display={"flex"}>
          <Typography variant="h5">{`$ ${amount}`}</Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default TransactionItem;
