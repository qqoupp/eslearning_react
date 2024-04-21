import React from "react";
import { TextField } from "@mui/material";

const Textfield = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <TextField
      InputProps={{
        rows: 7,
        multiline: true,
        inputComponent: "textarea",
      }}
      id="outlined-multiline-static"
      variant="outlined"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "black", // Text color
          "& fieldset": {
            borderColor: "black", // Adjust border color for visibility
          },
          "&:hover fieldset": {
            borderColor: "gray", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "black", // Border color when focused
          },
        },
        "& .MuiInputLabel-root": {
          color: "white", // Label color
        },
        "& .MuiFormHelperText-root": {
          color: "white", // Helper text color
        },
      }}
    />
  );
};

export default Textfield;
