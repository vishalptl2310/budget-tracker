import React from "react";
import { TextField } from "@mui/material";

const InputFieldsWithLabel = ({
  value,
  setValue,
  label,
  type,
  placeholder,
}) => {
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleValueChange}
      type={type}
      placeholder={placeholder}
      sx={{margin: '15px'}}
    />
  );
};

export default InputFieldsWithLabel;
