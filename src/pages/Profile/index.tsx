import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import Avatar from "@mui/material/Avatar";
import { getUserRequests } from "../../api/userRequest";
import { Fade, List, ListItem, Paper, Typography } from "@mui/material";
import { deleteUserRequest } from "../../api/userRequest";

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    // After the component mounts, set a timeout to enable animation
    setTimeout(() => {
      setAnimationReady(true);
    }, 100);
  }, []);

  interface UserRequest {
    id: number;
    technology: string;
    input: string;
    output: string;
    createdAt: string;
  }
  const handleDeleteUserRequest = async (requestId: number) => {
    try {
      await deleteUserRequest(requestId);
      // Filter out the deleted request from the userRequests state
      const updatedRequests = userRequests.filter(
        (request) => request.id !== requestId
      );
      setUserRequests(updatedRequests);
    } catch (error) {
      console.error("Error deleting user request:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserRequests(user.id)
        .then((data: UserRequest[]) => {
          setUserRequests(data);
        })
        .catch((error) => {
          console.error("Error fetching user requests:", error);
          // Handle the error state
        });
    }
  }, [user]);

  return (
    <div className="flex justify-center">
      <div
        style={{
          width: "1000px",
          maxHeight: "1500px",
          padding: "20px",
          margin: "20px",
          overflow: "auto",
        }}
      >
        <Fade in={animationReady} timeout={500}>
        <div className="flex flex-row justify-between p-6">
          <Avatar style={{ backgroundColor: "#001524" }}>
            {user?.email[0].toUpperCase()}
          </Avatar>
          <h1 className="text-2xl text-center font-semibold ">
            Email: {user?.email}
          </h1>
          <h1 className="text-2xl text-center font-semibold ">
            Joined on: {user?.createdAt.slice(0, 10)}
          </h1>
        </div>
        </Fade>
        <Fade in={animationReady} timeout={2000}>
        <List>
          {userRequests &&
            userRequests.length > 0 &&
            userRequests.map((request) => (
              <ListItem key={request.id}>
                <Paper
                  elevation={3}
                  style={{
                    width: "1000px",
                    maxHeight: "1500px",
                    padding: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    overflow: "auto",
                  }}
                >
                  <span className="font-bold text-lg">
                    Date and time of creation:{" "}
                  </span>
                  <br />
                  <Typography component="span" variant="body1">
                    {request.createdAt.slice(0, 10) +
                      " " +
                      request.createdAt.slice(11, 16)}
                  </Typography>
                  <br />
                  <span className="font-bold text-lg">
                    Selected technologies:{" "}
                  </span>
                  <br />
                  <Typography component="span" variant="body1">
                    {request.technology}
                  </Typography>
                  <br />
                  <span className="font-bold text-lg">
                    Project description:{" "}
                  </span>
                  <br />
                  <Typography component="span" variant="body1">
                    {request.input}
                  </Typography>
                  <br />
                  <div className="p-1 flex flex-row justify-between">
                    <div></div>
                    <div></div>
                    <button
                      className="font-bold border-2 border-black p-1"
                      onClick={() => handleDeleteUserRequest(request.id)}
                    >
                      Delete
                    </button>
                  </div>
                </Paper>
              </ListItem>
            ))}
        </List>
        </Fade>
      </div>
    </div>
  );
};
export default Profile;
