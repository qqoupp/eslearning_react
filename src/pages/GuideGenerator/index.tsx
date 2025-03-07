import { Paper } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MultiSelect from "../../components/SelectTechnologies";
import { Button, Fade, Grid, TextField, Typography } from "@mui/material";
import { fetchStream } from "../../api/openAI";
import { UserContext } from "../../providers/userProvider";
import { saveUserRequest } from "../../api/userRequest";
import Image5 from "../../components/Images/index5";
import { addLearningPath } from "../../api/learningPathApi";
import { deleteAllLearningPathInstructions } from "../../api/lpInstructionApi";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteAllLearningPathInstructionsQuery } from "../../api/lpInstructionQueryApi";
import Label from "../../components/Label/Label";
import Textfield from "../../components/Textfield/Textfield";

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
  const [description, setDescription] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [technology, setTechnology] = useState<string>("");
  const [showPaper, setShowPaper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animationReady, setAnimationReady] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // After the component mounts, set a timeout to enable animation
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  const myRef = useRef<HTMLDivElement>(null);

  const handleTechnologySelection = (newSelection: TechnologiesProps[]) => {
    setSelectedTechnologies(newSelection);
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
    await setUserInput(description);
    await setTechnology(selectedTechNames);
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

      setTimeout(() => {
        if (myRef.current) {
          myRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);

      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          navigate("/learningpath");
          console.log("Stream completed");
          setText(completeText);
          try {
            const jsonResponse = JSON.parse(completeText);
            await deleteAllLearningPathInstructionsQuery(userId);
            await deleteAllLearningPathInstructions(userId);
            await addLearningPath(userId, jsonResponse);
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
      const saveResponse = await saveUserRequest({
        userId: user.id,
        technology: selectedTechNames,
        input: description, // Directly use description here
        output: text, // Assuming text contains the response from the stream
      });
      console.log("Save response:", saveResponse);
    } catch (error) {
      console.error("Failed to read stream", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}technologies`);
      const data = await response.json();
      setTechnologies(data || []);
    };
    fetchData();
  }, []);


  return (
      <div className="p-12">
            <div
              className="flex flex-col items-center justify-center"
            >
                <Fade in={animationReady} timeout={500}>

              <div className="flex flex-col p-4 md:p-10">
                
                  
                <Label 
                  text="Select technologies"
                />
                <MultiSelect
                  technologies={technologies}
                  onSelectionChange={handleTechnologySelection}
                />
                 <Label
                  text="Describe what you want to build"
                 />
                <Textfield
                  value={description}
                  setValue={setDescription}
                />
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl ${
                      !description.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    style={{ width: "100%" }}
                    disabled={!description.trim()} // Disable button if description is empty
                  >
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                      Generate
                    </span>
                  </button>
                </div>
              </div>
              </Fade>
            </div>
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
                        Proceed to the next page, where you can view youre
                        learning path.
                      </Typography>
                      <Link to={"/learningpath"}>
                        <button
                          className="landing-page-button relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-xl"
                        >
                          <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                          <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                            View Learning Path
                          </span>
                        </button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </Paper>
          </div>
        )}
      </div>
  );
};
export default GuideGenerator;
