import React from "react";
import { UserContext } from "../../providers/userProvider";
import Avatar from "@material-ui/core/Avatar";


const Profile = () => {
  const { user ,isLoggedIn, logout } = React.useContext(UserContext);

    return (<div>
      <Avatar style={{backgroundColor:"#001524"}}>{user?.username[0].toUpperCase()}</Avatar>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Username : {user?.username}</h1>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Email : {user?.email}</h1>
      <h1 className="text-3xl text-center font-semibold my-7 pr-12">Joined on : {user?.createdAt.slice(0,10)}</h1>

      


    </div>);
}
export default Profile;