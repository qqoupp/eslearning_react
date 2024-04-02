import { Input, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import MultiSelect from "../../components/SelectTechnologies";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { fetchStream } from "../../api/openAI";
import { UserContext } from "../../providers/userProvider";
import { saveUserRequest } from "../../api/userRequest";
import Image5 from "../../components/Images/index5";

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

  const myRef = React.useRef<HTMLDivElement>(null);

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
        if (myRef.current) {
          myRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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
      <div className="p-12">
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Image5 />
          </Grid>
          <Grid item xs={7}>
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
              <div className="flex flex-col p-10">
                <Typography
                  variant="h4"
                  component="div"
                  className="text-4xl md:text-5xl pt-5"
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
                  className="text-4xl md:text-5xl"
                >
                  Describe what you want to build
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  multiline
                  rows={7}
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    padding: "10px",
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
                    type="button"
                    onClick={handleSubmit}
                    className="bg-costum text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <div ref={myRef} style={{ width: "100%" }} className="pt-40">
          <Paper
            elevation={5}
            
            style={{
              width: "100%",
              padding: "20px",
              margin: "20px",
              backgroundColor: "inherit",
              overflow: "auto",
            }}
          >
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
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};
export default GuideGenerator;
