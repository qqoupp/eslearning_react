import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import { getLearningPath } from "../../api/learningPathApi";
import { List, ListItem, Paper, Typography } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { fetchInstructionStream } from "../../api/openAI";
import { addLearningPathInstructions } from "../../api/lpInstructionApi";

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
  const [text, setText] = React.useState("");
  const handleClose = () => setOpen(false);


  interface LearningPath {
    id: number;
    name: string;
    instruction: string;
    description: string;
    output: string;
    completed: boolean;
  }

  const handleOpen = async (technology: string,instruction: string, description:string, learningPathId:number) => {
    setOpen(true);
    const prompt = `
        Using ${technology}, ${instruction}. Description: ${description}
      Examples of code snippets should not be included in the guide, but references to relevant documentation and resources are encouraged.
    `;
    setText(""); // Clear previous text if any
    let completeText = ""; // Initialize a variable to hold the complete response text

    try {
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
          setText(completeText); 
          try {
            const jsonResponse = JSON.parse(completeText);
            console.log("JSON Response:", jsonResponse);
            addLearningPathInstructions(learningPathId, jsonResponse);
          } catch (error) {
            console.error("Failed to parse JSON", error);
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
        <Paper
          elevation={3}
          style={{
            width: "1300px",
            maxHeight: "1500px",
            margin: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            overflow: "auto",
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
                      <DoneOutlineIcon
                        sx={{ color: "green" }}
                      ></DoneOutlineIcon>
                      <div>
                      <Button onClick={() => handleOpen(request.name, request.instruction, request.description, request.id)}>Explore more</Button>

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          BackdropProps={{
                            style: {
                              backgroundColor: 'transparent', // Sets the backdrop color to fully transparent
                            },
                          }}

                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              Guide
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              {text}
                            </Typography>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </Paper>
                </ListItem>
              ))}
          </List>
        </Paper>
      </div>
    </div>
  );
};
export default LearningPath;
