import { Input, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import MultiSelect from "../../components/SelectTechnologies";
import { Grid, TextField, Typography } from "@mui/material";
import { Padding } from "@mui/icons-material";

export type TechnologiesProps = {
  name: string;
  type: string;
  description: string;
  short_description: string;
};

const GuideGenerator = () => {
  const [technologies, setTechnologies] = React.useState<TechnologiesProps[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:6300/api/v1/technologies");
      const data = await response.json();
      setTechnologies(data || []);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3} className="pt-32">
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // Change the size to fit the parent element of this div
              width: "100%",
              height: "100%",
            }}
          >
            <Paper
              style={{
                height: "70vh",
                backgroundColor: "#001524",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                display: "flex",
              }}
              elevation={3}
            >
              <div className="flex flex-col text-white p-10">
                <Typography
                  variant="h4"
                  component="div"
                  className="pl-12 text-4xl md:text-5xl"
                >
                  Select technologies
                </Typography>
                <MultiSelect technologies={technologies} />
                <Typography
                  variant="h4"
                  component="div"
                  className="pl-12 text-4xl md:text-5xl"
                >
                  Describe what you want to build
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  rows={7}
                  placeholder="Default Value"
                  variant="outlined"
                  sx={{
                    padding: "10px",
                    "& .MuiOutlinedInput-root": {
                      color: "white", // Text color
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)", // Adjust border color for visibility
                      },
                      "&:hover fieldset": {
                        borderColor: "white", // Border color on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white", // Border color when focused
                      },
                    },
                    // Optional: If you also want to style the label like in the MultiSelect
                    "& .MuiInputLabel-root": {
                      color: "white", // Label color
                    },
                    // Optional: If you have a helper text and want to style it
                    "& .MuiFormHelperText-root": {
                      color: "white", // Helper text color
                    },
                  }}
                />
              </div>
          
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          
          <Paper
            style={{
              height: "70vh",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            elevation={3}
          >
            <div>AI generated project guide</div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default GuideGenerator;
