import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import { getLearningPath } from "../../api/learningPathApi";
import { List, ListItem, Paper, Typography } from "@mui/material";

const LearningPath = () => {
  const { user } = React.useContext(UserContext);
  const [learningPath, setLearningPath] = useState<LearningPath[]>([]);

  interface LearningPath {
    id: number;
    name: string;
    instruction: string;
    description: string;
    output: string;
    completed: boolean;
  }

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
                      <span className="font-bold text-lg">name: </span>
                      <br />
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
