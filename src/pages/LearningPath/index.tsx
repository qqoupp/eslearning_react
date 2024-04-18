import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import {
  changeCompletedStatus,
  getLearningPath,
} from "../../api/learningPathApi";
import {
  CircularProgress,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { fetchInstructionStream } from "../../api/openAI";
import {
  addLearningPathInstructions,
  getLearningPathInstructions,
} from "../../api/lpInstructionApi";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '100%', // Use 100% to ensure it doesn't exceed the width of the screen
  maxWidth: 900, // Use maxWidth to limit the size on larger screens
  maxHeight: '90vh', // Use vh units for height to ensure it doesn't exceed the viewport height
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  '@media (max-width:600px)': { // Adjustments for smaller screens
    width: '90%', // Slightly smaller width on small screens
    p: 2, // Smaller padding on small screens
  }
} as const;


const LearningPath = () => {
  const { user } = React.useContext(UserContext);
  const [learningPath, setLearningPath] = useState<LearningPath[]>([]);
  const [open, setOpen] = React.useState(false);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setInstructions([]); // Clear instructions on close
  };

  interface Instruction {
    id: number;
    learningPathId: number;
    step: string;
    solution: string;
  }

  interface LearningPath {
    id: number;
    name: string;
    instruction: string;
    description: string;
    output: string;
    completed: boolean;
  }

  const handleOpen = async (
    technology: string,
    instruction: string,
    description: string,
    learningPathId: number
  ) => {
    setOpen(true);
    setIsLoading(true);
    const prompt = `
        Using ${technology}, ${instruction}. Description: ${description}
      Examples of code snippets should not be included in the guide, but references to relevant documentation and resources are encouraged.
    `;
    let completeText = "";

    try {
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
              console.log("JSON Response:", jsonResponse);
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
    }
  };

  useEffect(() => {
    if (user) {
      getLearningPath(user.id)
        .then((data: LearningPath[]) => {
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
      <div className="p-10">
        <Typography variant="h3" component="h1">
          Here, you can explore your personalized learning journey and monitor
          your advancements. Furthermore, you&apos;ll have access to in-depth
          explanations for each phase of your path.
        </Typography>
      </div>
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
                    elevation={3}
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
                      <br/>
                  
                      <Typography component="span" variant="body2">
                        {request.description}
                      </Typography>
                      <br />
                      <div>
                      <div className="flex flex-row justify-between">
                        <div>
                        </div>
                        <div className="flex justify-center gap-1 pt-3">
                          <a
                            href="#_"
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
                          </a>
                          <a
                            href="#_"
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
                          </a>
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
    </div>
  );
};
export default LearningPath;
