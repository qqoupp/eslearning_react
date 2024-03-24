import { Input, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import MultiSelect from "../../components/SelectTechnologies";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { fetchStream } from "../../api/openAI";
import { UserContext } from "../../providers/userProvider";
import { saveUserRequest } from "../../api/userRequest";

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
  const { user } = React.useContext(UserContext);

  const [selectedTechnologies, setSelectedTechnologies] = React.useState<
    TechnologiesProps[]
  >([]);
  const [description, setDescription] = React.useState<string>("");
  const [messages, setMessages] = React.useState<string[]>([]);
  const [userInput, setUserInput] = React.useState<string>("");
  const [technology, setTechnology] = React.useState<string>("");

  const handleTechnologySelection = (newSelection: TechnologiesProps[]) => {
    setSelectedTechnologies(newSelection);
  };

  const handleSave = async () => {
    console.log({
      userId: user?.id,
      technology: technology,
      input: userInput,
      output: messages.join("\n"),
    });

    // Only proceed if all values are defined
    if (user?.id && userInput && messages.length > 0) {
      try {
        const response = await saveUserRequest({
          userId: user.id,
          technology: technology,
          input: userInput,
          output: messages.join("\n"),
        });
        console.log("Save response:", response);
      } catch (error) {
        console.error("Error saving:", error);
      }
    } else {
      console.error("Required data is not set");
    }
  };

  const handleSubmit = async () => {
    const selectedTechNames = selectedTechnologies
      .map((tech) => tech.name)
      .join(", ");
    const prompt = `I want a guide for building a program using: ${selectedTechNames} this is what i want it to do: ${description}`;
    setUserInput(description);
    setTechnology(selectedTechNames);
    if (!description.trim()) return;

    setMessages([]); // Clear previous messages if any
    let paragraph = ""; // Holds ongoing text

    try {
      const reader = await fetchStream(prompt);
      const decoder = new TextDecoder();

      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          if (paragraph) setMessages((prev) => [...prev, paragraph.trim()]);
          console.log("Stream completed");
          return;
        }
        const text = decoder.decode(value);
        const lines = text.split("\n"); // Split text into lines
        for (const line of lines) {
          if (line === "") {
            // Empty line signifies a paragraph break
            if (paragraph) {
              setMessages((prev) => [...prev, paragraph.trim()]);
              paragraph = "";
            }
          } else {
            // Add the line to the current paragraph, add a space to separate from the previous line
            paragraph += line + " ";
          }
        }
        await processChunk();
      };

      await processChunk();
    } catch (error) {
      console.error("Failed to read stream", error);
    }
  };

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
      <Grid container spacing={3} className="pt-25">
        <Grid item xs={12} md={12} lg={6}>
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
            <Typography
              variant="h3"
              component="div"
              className="text-4xl md:text-5xl"
            >
              The Ideea
            </Typography>
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
                  className="pl-12 text-4xl md:text-5xl pt-5"
                >
                  Select technologies
                </Typography>
                <MultiSelect
                  technologies={technologies}
                  onSelectionChange={handleTechnologySelection}
                />
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    padding: "10px",
                    "& .MuiOutlinedInput-root": {
                      color: "white", // Text color
                      "& fieldset": {
                        borderColor: "white", // Adjust border color for visibility
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)", // Border color on hover
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
                <div className="flex justify-center pt-5">
                  <button
                    onClick={handleSubmit}
                    className="w-40 h-10 bg-slate-100 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded-full"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Typography
            variant="h3"
            component="div"
            className="text-4xl md:text-5xl pl-40"
          >
            The Guide
          </Typography>
          <Paper
            style={{
              height: "70vh",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "auto",
              boxSizing: "border-box",
            }}
            elevation={3}
          >
            <div style={{ width: "100%" }}>
              {messages.map((msg, index) => (
                <Typography
                  variant="inherit"
                  key={index}
                  style={{
                    marginBottom: "0.5rem",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap", // Allows natural breaks and white space
                  }}
                >
                  {msg}
                </Typography>
              ))}
              {messages.length === 0 ? null : (
                <button
                  onClick={handleSave}
                  className="w-40 h-10 bg-costum hover:opacity-50 text-white font-bold py-2 px-4 rounded-full"
                >
                  Save
                </button>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default GuideGenerator;
