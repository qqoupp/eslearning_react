import React from 'react';
import { Drawer, List, ListItem, Paper } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/userProvider";

type NavigationDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AccountDrawer: React.FC<NavigationDrawerProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const { user ,isLoggedIn, logout } = React.useContext(UserContext);

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Drawer anchor="right" open={open} hideBackdrop={true}>
      <ClickAwayListener
        onClickAway={() => setOpen(false)}
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
      >
        <Paper
          style={{
            background:'#001524',
            color: 'white', 
          }}
        >
          <div className="px-5 py-7 min-h-screen">
          <div className="flex flex-col justify-between gap-y-5">
                <div className="flex flex-col pb-40 gap-0">
                  <span className="font-bold text-xl text-white">
                    Account
                  </span>
                  <span className="font-bold text-xl text-white">
                    Information
                  </span>
                    {isLoggedIn && (
                      <span>
                        {user?.username}
                      </span>
                    
                    )}
                </div>
                <div className="flex flex-col align-items-centre">
                  <List>
                    {!isLoggedIn && (
                      <div>
                    <ListItem
                      button
                      className="text-xl gap-y-5"
                      onClick={() => handleNavigate("/signin")}
                    >
                      Sign In
                    </ListItem>
                    <ListItem
                      button
                      className="text-xl gap-y-5"
                      onClick={() => handleNavigate("/signup")}
                    >
                      Sign Up
                    </ListItem>
                      </div>
                      )}
                    {isLoggedIn && (
                      <div>
                      <ListItem button className="text-xl gap-y-5" onClick={() => handleNavigate("/profile")}>
                        Profile
                      </ListItem>
                      <ListItem button className="text-xl gap-y-5" onClick={logout}>
                        Sign Out
                      </ListItem>
                      </div>
                    )}
                    <ListItem button className="text-xl gap-y-5" onClick={() => handleNavigate("/about")}>
                      About
                    </ListItem>
                    <ListItem button className="text-xl gap-y-5">
                      Contact
                    </ListItem>
                  </List>
                </div>
              </div>
          </div>
        </Paper>
      </ClickAwayListener>
    </Drawer>
  );
};

export default AccountDrawer;
