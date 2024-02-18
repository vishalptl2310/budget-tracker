import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import InputFieldsWithLabel from "../InputField";
import { updateRecentTrasaction } from "../../store/actions/recentTransactionsActions";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense } from "../../store/actions/expenseTracker";
import AlertMessageComponent from "../alertMessage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const EditValueModel = ({ isOpen, setIsOpen, currentValues }) => {
  const balance = useSelector((state) => state.expenseTracker.balance);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const handleAmountChange = useCallback((val) => {
    setAmount(val);
  }, []);

  const handleDescriptionChange = useCallback((val) => {
    setDescription(val);
  }, []);

  const onSubmit = useCallback(() => {
    if (amount && description) {
      setAmount(0);
      setDescription("");
      setIsOpen(false);
      const balanceGreaterThanZero = eval(
        `${balance} + ${currentValues.amount} - ${amount}`
      );
      if (balanceGreaterThanZero >= 0) {
        dispatch(updateExpense(amount - currentValues.amount));
        dispatch(
          updateRecentTrasaction({
            amount,
            description,
            index: currentValues.index,
          })
        );
      } else {
        setAlert(true);
      }
    }
  }, [amount, balance, currentValues, description, dispatch, setIsOpen]);

  useEffect(() => {
    setAmount(currentValues.amount);
    setDescription(currentValues.description);
  }, [currentValues]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  const memoizedAlertMessageComponent = useMemo(() => {
    return alert && <AlertMessageComponent message={"Transaction failed (balance can't be negative)"} />;
  }, [alert]);

  return (
    <>
      {memoizedAlertMessageComponent}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{ alignSelf: "end" }} onClick={() => setIsOpen(false)}>
            <Close />
          </IconButton>
          <InputFieldsWithLabel
            label="Amount"
            type="number"
            value={amount}
            setValue={handleAmountChange}
            placeholder="Amount"
          />
          <InputFieldsWithLabel
            label="Description"
            type="text"
            value={description}
            setValue={handleDescriptionChange}
            placeholder="Description"
          />
          <Button
            variant="contained"
            sx={{ margin: "15px", height: "50px" }}
            onClick={onSubmit}
          >
            Edit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EditValueModel;
