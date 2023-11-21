import React from "react";
import Logo from "../Logo";
import HeaderMenu from "../HeaderMenu";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, Paper } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <Drawer anchor="left" open={open} hideBackdrop={true}>
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <Paper
            style={{
              background:'#424242',
              color: 'white', 
            }}
          >
            <div className="px-5 py-7 min-h-screen">
              <div className="flex flex-col justify-between gap-y-5">
                <div className="flex flex-row">
                  <span className="font-bold text-xl text-emerald-600">
                    Elevate
                  </span>
                  <span className="font-bold text-xl text-emerald-800/75">
                    Stack
                  </span>
                  <span className="font-bold text-xl text-emerald-800/50">
                    Learning
                  </span>
                </div>
                <div className="flex flex-col align-items-centre">
                  <List>
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
      <div className="py-6 border-b flex flex-row justify-between">
        <HeaderMenu
          onClick={() => {
            setOpen(!open);
          }}
          open={open}
        />
        <Logo />
        <div>User Icon</div>
      </div>
    </>
  );
};

export default Header;
