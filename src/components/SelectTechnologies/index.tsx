import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { TechnologiesProps } from "../../pages/GuideGenerator";

const MultiSelect: React.FC<{ technologies: TechnologiesProps[] }> = ({ technologies }) =>{
  return (
    <Autocomplete
    sx={{
      m: 1, 
      width: 500, 
      "& .MuiOutlinedInput-root": {
        color: "white", // Text color
        "& fieldset": {
          borderColor: "rgba(255, 255, 255, 0.23)", // Adjust border color for visibility
        },
        "&:hover fieldset": {
          borderColor: "white", // Border color on hover
        },
      },
      "& .MuiAutocomplete-paper": {
        bgcolor: "#424242", // Dropdown background color
        color: "white", // Dropdown text color
      },
      "& .MuiChip-root": {
        bgcolor: "#616161", // Chip background color
        color: "white", // Chip text color
      }
    }}

      multiple
      options={technologies}
      getOptionLabel={(option) => option.name} 
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Choose Technologies"
        />
      )}
    />
  );
}
  export default MultiSelect;
