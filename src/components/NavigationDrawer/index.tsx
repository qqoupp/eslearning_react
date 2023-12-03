import React from 'react';
import { Drawer, List, ListItem, Paper } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useNavigate } from "react-router-dom";

type NavigationDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Drawer anchor="left" open={open} hideBackdrop={true}>
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
                    Elevate
                  </span>
                  <span className="font-bold text-xl text-white">
                    StackLearning
                  </span>
                </div>
                <div className="flex flex-col align-items-centre">
                  <List>
                  <ListItem button className="text-xl gap-y-5">
                      Project Guide
                    </ListItem>
                    <ListItem button className="text-xl gap-y-5">
                      Project Ideea
                    </ListItem>
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
                    <ListItem button className="text-xl gap-y-5">
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

export default NavigationDrawer;
