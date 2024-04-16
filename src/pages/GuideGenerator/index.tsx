import { Input, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import MultiSelect from "../../components/SelectTechnologies";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { fetchStream } from "../../api/openAI";
import { UserContext } from "../../providers/userProvider";
import { saveUserRequest } from "../../api/userRequest";
import Image5 from "../../components/Images/index5";
import { addLearningPath } from "../../api/learningPathApi";
import { deleteAllLearningPathInstructions } from "../../api/lpInstructionApi";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [text, setText] = React.useState<string>("");
  const [userInput, setUserInput] = React.useState<string>("");
  const [technology, setTechnology] = React.useState<string>("");
  const [showPaper, setShowPaper] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const myRef = React.useRef<HTMLDivElement>(null);

  const handleTechnologySelection = (newSelection: TechnologiesProps[]) => {
    setSelectedTechnologies(newSelection);
  };

  const handleSave = async () => {
    if (user?.id) { // Ensure there's text from the handleSubmit process
      try {
        // Use `text` instead of `messages.join("\n")` if that's the intended content to save
        const response = await saveUserRequest({
          userId: user.id,
          technology: technology,
          input: userInput,
          output: text,
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
    setIsLoading(true);
    setShowPaper(true);
    const selectedTechNames = selectedTechnologies
      .map((tech) => tech.name)
      .join(", ");
    const prompt = `
      Create a comprehensive guide outlining the learning path and development steps necessary for a project based on the following technologies and description.
  
      Technologies: ${selectedTechNames}
      Project Description: ${description}
  
      The guide should include a high-level overview of the project, the technologies used, and the steps required to build the project. Do not tell the user what to learn, but rather actionable coding steps.
      Examples of code snippets should not be included in the guide, but references to relevant documentation and resources are encouraged.
    `;
    setUserInput(description);
    setTechnology(selectedTechNames);
    if (!description.trim()) return;

    setMessages([]); // Clear previous messages if any
    setText(""); // Clear previous text if any
    let completeText = ""; // Initialize a variable to hold the complete response text

    try {
      const reader = await fetchStream(prompt);
      const decoder = new TextDecoder();
      const userId = user?.id;

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      if (myRef.current) {
        myRef.current.scrollIntoView({ behavior: "smooth" });
      }

      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream completed");
          setText(completeText);
          try {
            const jsonResponse = JSON.parse(completeText);
            await deleteAllLearningPathInstructions(userId);
            await addLearningPath(userId, jsonResponse);
            await handleSave();
          } catch (error) {
            console.error("Failed to parse JSON", error);
          }
          return;
        }
        const textChunk = decoder.decode(value);
        completeText += textChunk; // Accumulate the text chunks

        await processChunk();
      };
      
      await processChunk();
      
    } catch (error) {
      console.error("Failed to read stream", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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
          <Grid item xs={12} sm={6} md={5} lg={4}>
            <Image5 />
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={8}>
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
                  <a
                    href="#_"
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="landing-page-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl"
                  >
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                      Generate
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        {showPaper && (
          <div style={{ width: "100%" }} className="pt-60">
            <Paper
              elevation={5}
              ref={myRef}
              style={{
                height: "850px",
                width: "100%",
                padding: "20px",
                margin: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                overflow: "auto",
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="div"
                    className="text-4xl md:text-5xl"
                  >
                    Generating...
                  </Typography>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <>
                  {text}
                  {text.length > 0 && (
                    <div className="flex flex-col items-center justify-center pt-10">
                    <Typography
                      variant="body2"
                      component="div"
                      className="text-4xl md:text-5xl pt-3 pb-3"
                    >
                     Proceed to the next page, where you can view youre learning path.
                    </Typography>
                    <Link to={"/learningpath"}>
                      <a
                        href="#_"
                        className="landing-page-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl"
                      >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                          View Learning Path
                        </span>
                      </a>
                    </Link>
                    </div>
                  )}
                </>
              )}
            </Paper>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default GuideGenerator;
