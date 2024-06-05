import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { TechnologiesProps } from "../../pages/GuideGenerator";

interface MultiSelectProps {
  technologies: TechnologiesProps[];
  onSelectionChange: (selectedTechs: TechnologiesProps[]) => void; // Add this line
}

const MultiSelect: React.FC<MultiSelectProps> = ({ technologies, onSelectionChange }) => {
  return (
    <Autocomplete
      sx={{
        width: "100%", 
        "& .MuiOutlinedInput-root": {
          color: "black",
          "& fieldset": {
            borderColor: "black",
          },
          "&:hover fieldset": {
            borderColor: "gray",
          },
        },
        "& .MuiAutocomplete-paper": {
          bgcolor: "#424242",
          color: "black",
        },
        "& .MuiChip-root": {
          bgcolor: "white",
          color: "black",
        }
      }}
      multiple
      options={technologies}
      getOptionLabel={(option) => option.name}
      disableCloseOnSelect
      onChange={(event, newValue) => {
        onSelectionChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Choose Technologies"
        />
      )}
    />
  );
};

export default MultiSelect;
