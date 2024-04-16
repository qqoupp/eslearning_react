import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import { getLearningPath } from "../../api/learningPathApi";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 800,
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 2,
  p: 4,
} as const;

const LearningPath = () => {
  const { user } = React.useContext(UserContext);
  const [learningPath, setLearningPath] = useState<LearningPath[]>([]);
  const [open, setOpen] = React.useState(false);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, [user]);
  return (
    <div>
      <div className="flex justify-center p-16 pl-36 pr-36">
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
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                      overflow: "auto",
                    }}
                  >
                    <div className="pt-1 pr-1 pl-1">
                      <Typography component="span" variant="body1">
                        {request.name}
                      </Typography>
                      <br />
                      <span className="font-bold text-lg">Instruction: </span>
                      <br />
                      <Typography component="span" variant="body1">
                        {request.instruction}
                      </Typography>
                      <br />
                      <span className="font-bold text-lg">Description: </span>
                      <br />
                      <Typography component="span" variant="body1">
                        {request.description}
                      </Typography>
                      <br />
                      <div className="flex flex-row justify-between">
                        <DoneOutlineIcon
                          sx={{ color: "green" }}
                        ></DoneOutlineIcon>
                        <div>
                          <Button
                            onClick={() =>
                              handleOpen(
                                request.name,
                                request.instruction,
                                request.description,
                                request.id
                              )
                            }
                          >
                            Explore more
                          </Button>
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
