import React from "react";
import Logo from "../Logo";
import HeaderMenu from "../HeaderMenu";
import { Drawer } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        hideBackdrop={true}
      >
        <ClickAwayListener
          onClickAway={() => {
            setOpen(false);
          }}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <div className="px-5 py-4 min-h-screen">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="text-sm">Welcome</span>
                <span className="text-xl font-bold">John Doe</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Your score</span>
                <span className="text-xl font-bold">100</span>
              </div>
            </div>
          </div>
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
        <div></div>
      </div>
    </>
  );
};

export default Header;
