import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import {
  changeCompletedStatus,
  getLearningPath,
} from "../../api/learningPathApi";
import {
  CircularProgress,
  Fade,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  fetchInstructionQueryStream,
  fetchInstructionStream,
} from "../../api/openAI";
import {
  addLearningPathInstructions,
  getLearningPathInstructions,
} from "../../api/lpInstructionApi";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
  addLearningPathInstructionsQuery,
  getLearningPathInstructionsQuery,
} from "../../api/lpInstructionQueryApi";
import { ClassNames } from "@emotion/react";
import Label from "../../components/Label/Label";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%", // Use 100% to ensure it doesn't exceed the width of the screen
  maxWidth: 900, // Use maxWidth to limit the size on larger screens
  maxHeight: "90vh", // Use vh units for height to ensure it doesn't exceed the viewport height
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "@media (max-width:600px)": {
    // Adjustments for smaller screens
    width: "90%", // Slightly smaller width on small screens
    p: 2, // Smaller padding on small screens
  },
} as const;


interface InstructionQuery {
  id: number;
  learningPathId: number;
  step: string;
  solution: string;
}

interface Instruction {
  id: number;
  learningPathId: number;
  step: string;
  solution: string;
}

export type LearningPathType = {
  id: number;
  name: string;
  instruction: string;
  description: string;
  output: string;
  completed: boolean;
}

const LearningPath = () => {
  const { user } = React.useContext(UserContext);
  const [learningPath, setLearningPath] = useState<LearningPathType[]>([]);
  const [open, setOpen] = React.useState(false);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [instructionQuery, setInstructionQuery] = useState<InstructionQuery[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadin2, setIsLoading2] = useState(false);
  const [change, setChange] = useState(false);
  const [description, setDescription] = useState("");
  const [instructionResponse, setInstructionResponse] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [elevation, setElevation] = useState(3);
  const [animationReady, setAnimationReady] = useState(false);



  useEffect(() => {
    // After the component mounts, set a timeout to enable animation
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setInstructions([]); // Clear instructions on close
    setInstructionQuery([]);
    setDescription("");
  };

  

  const handleQuery = async (
    question: string,
    instruction: string,
    learningPathId: number
  ) => {
    setInstructionResponse("");
    setIsLoading2(true);
    const prompt = `
      Instructions: ${instruction}, My Question: ${question}
      Examples of code snippets should not be included in the guide, but references to relevant documentation and resources are encouraged.
    `;
    let completeText = "";

    try {
      const reader = await fetchInstructionQueryStream(prompt);
      const decoder = new TextDecoder();
      const userId = user?.id;

      if (!userId) {
        console.error("User ID not found");
        return;
      }
      const processChunk = async () => {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream completed");
          try {
            const jsonResponse = JSON.parse(completeText);
            console.log("JSON Response:", jsonResponse);
            const instructionsString = JSON.stringify(jsonResponse.task);
            setInstructionResponse(instructionsString);
            setInstructionQuery(jsonResponse.task);
            addLearningPathInstructionsQuery(
              learningPathId,
              userId,
              jsonResponse
            );
          } catch (error) {
            console.error("Failed to parse JSON", error);
            setIsLoading2(false);
          }
          const textChunk = decoder.decode(value);
          completeText += textChunk; // Accumulate the text chunks
          return;
        }
        const textChunk = decoder.decode(value);
        completeText += textChunk; // Accumulate the text chunks

        await processChunk();
      };

      await processChunk();
    } catch (error) {
      console.error("Failed to read stream", error);
    } finally {
      setDescription("");
      setIsLoading2(false);
    }
  };

  const handleOpen = async (
    technology: string,
    instruction: string,
    description: string,
    learningPathId: number
  ) => {
    setOpen(true);
    setInstructionResponse("");
    setIsLoading(true);
    const prompt = `
        Using ${technology}, ${instruction}. Description: ${description}
      Examples of code snippets should not be included in the guide, but references to relevant documentation and resources are encouraged.
    `;
    let completeText = "";

    try {
      setIsFormVisible(true);
      const existingInstructions =
        await getLearningPathInstructions(learningPathId);
      if (existingInstructions.length > 0) {
        setInstructions(existingInstructions);
      } else {
        const reader = await fetchInstructionStream(prompt);
        const decoder = new TextDecoder();
        const userId = user?.id;

        if (!userId) {
          console.error("User ID not found");
          return;
        }
        const processChunk = async () => {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream completed");
            try {
              const jsonResponse = JSON.parse(completeText);
              const instructionsString = JSON.stringify(jsonResponse.task);
              setInstructionResponse(instructionsString);
              setInstructions(jsonResponse.task);
              addLearningPathInstructions(learningPathId, userId, jsonResponse);
            } catch (error) {
              console.error("Failed to parse JSON", error);
              setIsLoading(false);
            }
            const textChunk = decoder.decode(value);
            completeText += textChunk; // Accumulate the text chunks
            return;
          }
          const textChunk = decoder.decode(value);
          completeText += textChunk; // Accumulate the text chunks

          await processChunk();
        };

        await processChunk();
      }
    } catch (error) {
      console.error("Failed to read stream", error);
    } finally {
      setIsLoading(false);
      setIsFormVisible(true);

    }
  };

  useEffect(() => {
    if (user) {
      getLearningPath(user.id)
        .then((data: LearningPathType[]) => {
          setLearningPath(data);
        })
        .catch((error) => {
          console.error("Error fetching user requests:", error);
          // Handle the error state
        });
    }
  }, [user, change]);
  return (
    <div>
      <Fade in={animationReady} timeout={500}>
      <div className="p-10 landing-page-text">
        <Typography variant="h3" component="h1">
          Here, you can explore your personalized learning journey and monitor
          your advancements. Furthermore, you&apos;ll have access to in-depth
          explanations for each phase of your path.
        </Typography>
      </div>
      </Fade>
      <Fade in={animationReady} timeout={2000}>
      <div className="flex justify-center">
        <div
          style={{
            width: "1300px",
            margin: "20px",
          }}
        >
          <List>
            {learningPath &&
              learningPath.length > 0 &&
              learningPath.map((request) => (
                <ListItem key={request.id}>
                  <Paper
                    elevation={elevation}
                    onMouseOver={() => setElevation(8)} 
                    onMouseOut={() => setElevation(3)} 
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      overflow: "auto",
                    }}
                  >
                    <div className="pt-1 pr-1 pl-1">
                      <div className="flex flex-row justify-between">
                        <Typography component="span" variant="body2">
                          {request.name}
                        </Typography>
                        {request.completed ? (
                          <TaskAltOutlinedIcon
                            onClick={() =>
                              changeCompletedStatus(request.id)
                                .then(() => setChange(!change))
                                .catch((error) => {
                                  console.error(
                                    "Error changing status:",
                                    error
                                  );
                                })
                            }
                            fontSize="large"
                            sx={{ color: "green" }}
                          ></TaskAltOutlinedIcon>
                        ) : (
                          <CircleOutlinedIcon
                            onClick={() =>
                              changeCompletedStatus(request.id)
                                .then(() => setChange(!change))
                                .catch((error) => {
                                  console.error(
                                    "Error changing status:",
                                    error
                                  );
                                })
                            }
                            fontSize="large"
                            sx={{ color: "green" }}
                          ></CircleOutlinedIcon>
                        )}
                      </div>

                      <Typography component="span" variant="body2">
                        {request.instruction}
                      </Typography>
                      <br />
                      <br />

                      <Typography component="span" variant="body2">
                        {request.description}
                      </Typography>
                      <br />
                      <div>
                        <div className="flex flex-row justify-between">
                          <div></div>
                          <div className="flex justify-center gap-1 pt-3">
                            <button
                              onClick={() =>
                                changeCompletedStatus(request.id)
                                  .then(() => setChange(!change))
                                  .catch((error) => {
                                    console.error(
                                      "Error changing status:",
                                      error
                                    );
                                  })
                              }
                              className="landing-page-button relative inline-flex items-center justify-start px-1 py-1 overflow-hidden font-medium transition-all bg-costum group border-black border-2 rounded-l-xl hover:bg-white hover:border-black"
                            >
                              <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 right-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 mr-9 group-hover:mr-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                {request.completed
                                  ? "Mark as Incomplete"
                                  : "Mark as Complete"}
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleOpen(
                                  request.name,
                                  request.instruction,
                                  request.description,
                                  request.id
                                )
                              }
                              className="landing-page-button relative inline-flex items-center justify-start px-1 py-1 overflow-hidden font-medium transition-all bg-costum hover:bg-white group border-black border-2 hover:border-black rounded-r-xl"
                            >
                              <span className="w-48 h-48 rounded rotate-[-40deg] bg-white absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-15 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                              <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                Explore this instruction
                              </span>
                            </button>
                          </div>
                        </div>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          BackdropProps={{
                            style: {
                              backgroundColor: "transparent", // Sets the backdrop color to fully transparent
                            },
                          }}
                        >
                          <Box sx={style}>
                            {isLoading ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                }}
                              >
                                <CircularProgress color="inherit" />
                                <Typography
                                  variant="h6"
                                  component="h2"
                                  sx={{ mt: 2 }}
                                >
                                  Generating...
                                </Typography>
                              </div>
                            ) : (
                              instructions.map((instruction) => (
                                <Box key={instruction.id} sx={{ mb: 2 }}>
                                  <Typography variant="h6" component="h4">
                                    {instruction.step}
                                  </Typography>
                                  <Typography variant="body1">
                                    {instruction.solution}
                                  </Typography>
                                </Box>
                              ))
                            )}
                            
                    
                            {isFormVisible && !isLoading && (
                              <>
                                <Label text="Uncertain about any of the steps above? Ask a question." />
                                <TextField
                                  fullWidth
                                  id="outlined-multiline-static"
                                  multiline
                                  rows={7}
                                  variant="outlined"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
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
                                <div className=" flex justify-center pb-10">
                                  <button
                                    type="submit"
                                    onClick={() => {
                                      if (description.trim()) {
                                        handleQuery(
                                          description,
                                          instructionResponse,
                                          request.id
                                        );
                                        setIsFormVisible(false); // Hide the form after click
                                      }
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
                                    <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                      Generate
                                    </span>
                                  </button>
                                </div>
                              </>
                            )}
                            {isLoadin2 ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                }}
                              >
                                <CircularProgress color="inherit" />
                                <Typography
                                  variant="h6"
                                  component="h2"
                                  sx={{ mt: 2 }}
                                >
                                  Generating...
                                </Typography>
                              </div>
                            ) : (
                              
                              <div className={!isFormVisible ? "border-t border-black" : ""}>
                                {instructionQuery.map((instruction) => (
                                  <Box key={instruction.id} sx={{ mt: 2}}>
                                    <Typography variant="body1">
                                      {instruction.solution}
                                    </Typography>
                                    <button
                                      onClick={() => {
                                        setIsFormVisible(true);
                                        setInstructionQuery([]);
                                      }}
                                      className="mt-4 landing-page-button relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-medium transition-all bg-costum group border-black border-2 rounded-xl hover:bg-white hover:border-black hover:text-black text-white"
                                    >
                                      Ask another question
                                    </button>
                                  </Box>
                                ))}

                              </div>
                            )}
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </Paper>
                </ListItem>
              ))}
          </List>
        </div>
      </div>
      </Fade>
    </div>
  );
};
export default LearningPath;
