import React, { useEffect, useState } from "react";
import { UserContext } from "../../providers/userProvider";
import Avatar from "@material-ui/core/Avatar";
import { getUserRequests } from "../../api/userRequest";
import { List, ListItem, Paper, Typography } from "@material-ui/core";


const Profile = () => {
  const { user ,isLoggedIn, logout } = React.useContext(UserContext);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);

  interface UserRequest {
    id: number;
    input: string;
    output: string;
  }

  useEffect(() => {
    if (user) {
      getUserRequests(user.id)
        .then((data : UserRequest[]) => {
          setUserRequests(data);
        })
        .catch((error) => {
          console.error('Error fetching user requests:', error);
          // Handle the error state
        });
    }
  }, [user]);
    return (<div>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px', backgroundColor:"white" }}>
      <Avatar style={{backgroundColor:"#001524"}}>{user?.username[0].toUpperCase()}</Avatar>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Username : {user?.username}</h1>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Email : {user?.email}</h1>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Joined on : {user?.createdAt.slice(0,10)}</h1>
        <Typography variant="h5" gutterBottom>Saved Project Guides</Typography>
        <List>
          {userRequests.map((request) => (
            <ListItem key={request.id}>
              <Paper elevation={3} style={{ padding: '20px', margin: '20px' , backgroundColor:"#001524", color:"white" }}>
              <Typography component="span" variant="body1">{request.input}</Typography>
              <br/>
              <Typography component="span" variant="body2">{request.output}</Typography>
            </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      


    </div>);
}
export default Profile;