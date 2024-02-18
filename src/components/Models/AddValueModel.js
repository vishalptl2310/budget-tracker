import { Close } from "@mui/icons-material";
import { Box,  Button,  IconButton,  Modal} from "@mui/material";
import React, { useState } from "react";
import InputFieldsWithLabel from "../InputField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection:'column'
};

const AddValueModel = ({isOpen ,setIsOpen, buttonLabel, handleSubmit}) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  
  const handleAmountChange = (val)=>{
    setAmount(val)
  }
  const handleDescriptionChange = (val)=>{
    setDescription(val)
  }
  const onSubmit = ()=>{
    if(amount && description){
      const obj = {
        amount,
        description
      }
      setAmount(0);
      setDescription("")
      handleSubmit(obj)
    }
  }
  
  return (
    <>
      <Modal
        open={isOpen}
        onClose={setIsOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={{alignSelf:'end'}} onClick={()=>setIsOpen(false)}>
            <Close/>
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
          <Button variant="contained" sx={{margin:'15px', height: '50px'}} onClick={onSubmit}>{buttonLabel} </Button>
        </Box>
      </Modal>
    </>
  );
};

export default React.memo(AddValueModel);
