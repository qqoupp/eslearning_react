import React from "react";
import Logo from "../Logo";
import HeaderMenu from "../HeaderMenu";
import AccountMenu from "../AccountMenu";
import NavigationDrawer from "../NavigationDrawer";
import AccountDrawer from "../AccountDrawer";
const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [accountOpen, setAccountOpen] = React.useState(false);

  return (
    <>
      <NavigationDrawer open={open} setOpen={setOpen} />
      <AccountDrawer open={accountOpen} setOpen={setAccountOpen} />
      <div className="pb-2 border-b flex flex-row justify-between">
        <HeaderMenu
          onClick={() => setOpen(!open)}
          open={open}
        />
        <Logo />
        <AccountMenu
          onClick={() => setAccountOpen(!accountOpen)}
          open={accountOpen}
        />
      </div>
    </>
  );
};

export default Header;
