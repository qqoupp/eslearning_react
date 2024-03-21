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
        m: 1, 
        width: 500, 
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.23)",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
        },
        "& .MuiAutocomplete-paper": {
          bgcolor: "#424242",
          color: "white",
        },
        "& .MuiChip-root": {
          bgcolor: "#616161",
          color: "white",
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
