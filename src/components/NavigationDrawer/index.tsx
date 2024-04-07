import React from "react";
import { Drawer, List, ListItem, Paper } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/userProvider";

type NavigationDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();

  const { isLoggedIn } = React.useContext(UserContext);

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
            background: "#001524",
            color: "white",
          }}
        >
          <div className="px-5 py-7 min-h-screen w-72">
            <div className="flex flex-col justify-between gap-y-5">
              <div className="flex flex-col pb-40 gap-0">
                <span className="font-bold text-xl text-white">Elevate</span>
                <span className="font-bold text-xl text-white">
                  StackLearning
                </span>
              </div>
              <div className="flex flex-col align-items-centre">
                <List>
                  {isLoggedIn ? (
                    <div>
                      <ListItem
                        button
                        className="text-xl gap-y-5"
                        onClick={() => handleNavigate("/guide")}
                      >
                        Project Guide
                      </ListItem>
                      <ListItem
                        button
                        className="text-xl gap-y-5"
                        onClick={() => handleNavigate("/project")}
                      >
                        Project Ideea
                      </ListItem>
                    </div>
                  ) : (
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

                  <ListItem
                    button
                    className="text-xl gap-y-5"
                    onClick={() => handleNavigate("/about")}
                  >
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
