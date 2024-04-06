import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import Avatar from "@material-ui/core/Avatar";
import { getUserRequests } from "../../api/userRequest";
import { List, ListItem, Paper, Typography } from "@material-ui/core";
import { deleteUserRequest } from "../../api/userRequest";

const Profile = () => {
  const { user } = React.useContext(UserContext);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);

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
      <Paper
        elevation={3}
        style={{
          width: "1000px",
          maxHeight: "1500px",
          padding: "20px",
          margin: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          overflow: "auto",
        }}
      >
        <Avatar style={{ backgroundColor: "#001524" }}>
          {user?.username[0].toUpperCase()}
        </Avatar>
        <h1 className="text-3xl text-center font-semibold my-7 pr-12">
          Username : {user?.username}
        </h1>
        <h1 className="text-3xl text-center font-semibold my-7 pr-12">
          Email : {user?.email}
        </h1>
        <h1 className="text-3xl text-center font-semibold my-7 pr-12">
          Joined on : {user?.createdAt.slice(0, 10)}
        </h1>
        <Typography variant="h4" className="pl-4">
          History
        </Typography>
        <List>
          {userRequests && userRequests.length > 0 && userRequests.map((request) => (
            <ListItem key={request.id}>
              <div className="border-2 pt-1 pr-1 pl-1 border-black">
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
                <span className="font-bold text-lg">
                  Generated project guide:{" "}
                </span>
                <br />
                <Typography component="span" variant="body1">
                  {request.output}
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
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};
export default Profile;
